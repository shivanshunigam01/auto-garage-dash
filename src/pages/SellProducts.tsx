import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, ShoppingCart, Plus, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  code: string;
  price: number;
  stock: number;
  category: string;
  image?: string;
}

interface CartItem extends Product {
  quantity: number;
}

const SellProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [billData, setBillData] = useState({
    billNo: '',
    billDate: new Date().toLocaleDateString()
  });

  const categories = ['All', 'Tyres', 'Battery', 'Parts', 'Oil Filters'];

  const products: Product[] = [
    {
      id: '1',
      name: 'FILTER, OIL',
      code: 'U-ALL-2519',
      price: 55.00,
      stock: 2,
      category: 'Oil Filters'
    },
    {
      id: '2', 
      name: 'FILTER, OIL',
      code: 'U-ALL-2519',
      price: 55.00,
      stock: 77,
      category: 'Oil Filters'
    },
    {
      id: '3',
      name: 'TYRE, TUBELESS',
      code: 'U-ALL-2922',
      price: 288.00,
      stock: 67,
      category: 'Tyres'
    },
    {
      id: '4',
      name: 'TYRE, TUBELESS',
      code: 'U-ALL-2922', 
      price: 288.00,
      stock: 50,
      category: 'Tyres'
    },
    {
      id: '5',
      name: 'TYRE, TUBELESS',
      code: 'U-ALL-2922',
      price: 288.00,
      stock: 50,
      category: 'Tyres'
    },
    {
      id: '6',
      name: 'MISC PART',
      code: 'U-ALL-12366',
      price: 11.00,
      stock: 3,
      category: 'Parts'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
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

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
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

  return (
    <div className="p-6 h-full flex gap-6">
      {/* Left Side - Products */}
      <div className="flex-1 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Sell Products</h1>
          <p className="text-muted-foreground">Search and add products to create invoices</p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="flex items-center gap-2"
            >
              {category === 'All' && <Filter className="w-4 h-4" />}
              {category === 'Tyres' && <div className="w-4 h-4 rounded-full bg-muted-foreground" />}
              {category === 'Battery' && <div className="w-4 h-4 bg-status-estimate rounded" />}
              {category === 'Parts' && <div className="w-4 h-4 bg-muted-foreground rounded-sm" />}
              {category === 'Oil Filters' && <div className="w-4 h-4 bg-status-delivered rounded-full" />}
              {category}
            </Button>
          ))}
        </div>

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
            <Card key={product.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-sm font-medium">{product.name}</CardTitle>
                    <p className="text-xs text-muted-foreground">{product.code}</p>
                    <p className="text-xs text-muted-foreground">IMPORT</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => addToCart(product)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-bold text-foreground">{product.price.toFixed(2)}</span>
                  <Badge variant={product.stock > 10 ? "default" : "destructive"}>
                    In Stock {product.stock.toFixed(2)}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-3">Rack No. 0</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => addToCart(product)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Part
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Right Side - Cart and Bill Info */}
      <div className="w-80 space-y-4">
        {/* Bill Information */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Bill Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Bill No:</span>
              <Input
                placeholder="Enter bill number"
                value={billData.billNo}
                onChange={(e) => setBillData(prev => ({ ...prev, billNo: e.target.value }))}
                className="w-32 h-7 text-xs"
              />
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
              Parts / Services
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
                  <div key={item.id} className="flex justify-between items-center p-2 border rounded">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.code}</p>
                      <p className="text-sm font-bold">₹{item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>₹{getTotalAmount().toFixed(2)}</span>
                  </div>
                  <Button className="w-full mt-4" variant="success">
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SellProducts;