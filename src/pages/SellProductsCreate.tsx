import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, ShoppingCart, Plus, X, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  partNo: string;
  brand: string;
  rackNo: string;
  inStock: number;
  price: number;
  category: string;
  hasImage?: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

const SellProductsCreate = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [billData, setBillData] = useState({
    billNo: `B-${Date.now().toString().slice(-6)}`,
    billDate: new Date().toLocaleDateString()
  });

  const products: Product[] = [
    {
      id: '1',
      name: 'FILTER, OIL',
      partNo: 'U-ALL-2519',
      brand: 'Bosch',
      rackNo: 'R-01',
      inStock: 25,
      price: 55.00,
      category: 'parts',
      hasImage: false
    },
    {
      id: '2', 
      name: 'TYRE, TUBELESS 185/65R15',
      partNo: 'T-MRF-185',
      brand: 'MRF',
      rackNo: 'R-05',
      inStock: 12,
      price: 2850.00,
      category: 'tyres',
      hasImage: false
    },
    {
      id: '3',
      name: 'BATTERY 12V 65AH',
      partNo: 'BAT-EXI-65',
      brand: 'Exide',
      rackNo: 'R-03',
      inStock: 8,
      price: 4200.00,
      category: 'battery',
      hasImage: false
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.partNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    toast({
      title: "Product Added",
      description: `${product.name} added to cart`
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== productId));
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleProceedToCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is Empty",
        description: "Please add items to cart before proceeding",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Invoice Created",
      description: `Invoice ${billData.billNo} created successfully for ₹${getTotalAmount().toFixed(2)}`
    });
    
    navigate('/sell-products');
  };

  return (
    <div className="p-6 h-full flex gap-6">
      {/* Left Side - Product Catalog */}
      <div className="flex-1 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Create Sale</h1>
          <p className="text-muted-foreground">Select products to create a sale invoice</p>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="tyres">Tyres</TabsTrigger>
            <TabsTrigger value="battery">Battery</TabsTrigger>
            <TabsTrigger value="parts">Parts</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Type Part name to add (e.g. Bumper) / Scan Barcode"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <Card key={product.id} className="hover:shadow-md transition-shadow group">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <CardTitle className="text-sm font-medium">{product.name}</CardTitle>
                    <p className="text-xs text-muted-foreground">Part No: {product.partNo}</p>
                    <p className="text-xs text-muted-foreground">Brand: {product.brand}</p>
                  </div>
                </div>
                
                {/* Product Image Placeholder */}
                <div className="w-full h-20 bg-muted rounded flex items-center justify-center mb-3">
                  {product.hasImage ? (
                    <div className="text-xs text-muted-foreground">Product Image</div>
                  ) : (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Settings className="w-4 h-4" />
                      <span className="text-xs">No Image</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-foreground">₹{product.price.toFixed(2)}</span>
                    <Badge variant={product.inStock > 5 ? "default" : "destructive"} className="text-xs">
                      In Stock {product.inStock}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Rack No: {product.rackNo}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => addToCart(product)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Part
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Right Side - Cart */}
      <div className="w-80 space-y-4">
        {/* Bill Information */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Bill Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Bill No:</span>
              <span className="font-medium">{billData.billNo}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Bill Date:</span>
              <span className="font-medium">{billData.billDate}</span>
            </div>
          </CardContent>
        </Card>

        {/* Cart */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Parts & Services
              {cart.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCart([])}
                  className="ml-auto text-xs"
                >
                  Clear
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm">
                  Your Cart is empty. Please add items from your Inventory.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-start p-3 border rounded">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.partNo}</p>
                      <p className="text-sm font-bold">₹{item.price.toFixed(2)} each</p>
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-6 w-6 p-0"
                      >
                        -
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-6 w-6 p-0"
                      >
                        +
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => updateQuantity(item.id, 0)}
                        className="h-6 w-6 p-0 ml-1"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>₹{getTotalAmount().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (18% GST):</span>
                    <span>₹{(getTotalAmount() * 0.18).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total:</span>
                    <span>₹{(getTotalAmount() * 1.18).toFixed(2)}</span>
                  </div>
                  <div className="sticky bottom-0 bg-card pt-2">
                    <Button 
                      className="w-full" 
                      variant="brand"
                      onClick={handleProceedToCheckout}
                    >
                      Next →
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SellProductsCreate;