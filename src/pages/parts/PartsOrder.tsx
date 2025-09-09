import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Search, Plus, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface OrderLine {
  id: string;
  partName: string;
  partNo: string;
  brand: string;
  requestedQty: number;
  sizeQty: string;
  unitPrice: number;
  discount: number;
  taxPercent: number;
  totalPurchasePrice: number;
  remarks: string;
}

const PartsOrder = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState({
    vendor: '',
    stock: 'main-store',
    type: '',
    orderDate: new Date().toLocaleDateString()
  });

  const [orderLines, setOrderLines] = useState<OrderLine[]>([]);
  const [newLine, setNewLine] = useState({
    partName: '',
    qty: 1,
    partPrice: 0,
    priceType: 'mrp',
    serviceLabour: ''
  });

  const addOrderLine = () => {
    if (!newLine.partName) {
      toast({
        title: "Part Name Required",
        description: "Please enter a part name to add to the order",
        variant: "destructive"
      });
      return;
    }

    const newOrderLine: OrderLine = {
      id: Date.now().toString(),
      partName: newLine.partName,
      partNo: `PN-${Date.now().toString().slice(-6)}`,
      brand: 'Generic',
      requestedQty: newLine.qty,
      sizeQty: '1',
      unitPrice: newLine.partPrice,
      discount: 0,
      taxPercent: 18,
      totalPurchasePrice: newLine.partPrice * newLine.qty * 1.18,
      remarks: ''
    };

    setOrderLines(prev => [...prev, newOrderLine]);
    
    // Reset form
    setNewLine({
      partName: '',
      qty: 1,
      partPrice: 0,
      priceType: 'mrp',
      serviceLabour: ''
    });

    toast({
      title: "Part Added",
      description: `${newLine.partName} has been added to the order`
    });
  };

  const getTotalOrderValue = () => {
    return orderLines.reduce((total, line) => total + line.totalPurchasePrice, 0);
  };

  const handleBuyNow = () => {
    if (!orderData.vendor || !orderData.type) {
      toast({
        title: "Missing Required Fields",
        description: "Please select vendor and order type",
        variant: "destructive"
      });
      return;
    }

    if (orderLines.length === 0) {
      toast({
        title: "No Parts Added",
        description: "Please add parts to the order before proceeding",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Order Created",
      description: `Purchase order created for ₹${getTotalOrderValue().toFixed(2)}`
    });
    
    navigate('/parts/order');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Home</span>
        <span>›</span>
        <span className="text-foreground">Order</span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Direct Order</h1>
          <div className="flex gap-4 mt-2 text-sm">
            <span className="text-muted-foreground">Orders: <span className="text-foreground font-medium">NEW ORDER</span></span>
            <span className="text-muted-foreground">Order Date: <span className="text-foreground font-medium">{orderData.orderDate}</span></span>
          </div>
        </div>
      </div>

      {/* Order Header Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="vendor">Vendor *</Label>
              <div className="flex gap-2">
                <Select value={orderData.vendor} onValueChange={(value) => setOrderData(prev => ({ ...prev, vendor: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto-parts-ltd">Auto Parts Ltd</SelectItem>
                    <SelectItem value="bosch-india">Bosch India</SelectItem>
                    <SelectItem value="mrf-tyres">MRF Tyres</SelectItem>
                    <SelectItem value="exide-batteries">Exide Batteries</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="stock">Stock</Label>
              <Select value={orderData.stock} onValueChange={(value) => setOrderData(prev => ({ ...prev, stock: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main-store">Main Store</SelectItem>
                  <SelectItem value="warehouse">Warehouse</SelectItem>
                  <SelectItem value="service-bay">Service Bay</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="type">Type *</Label>
              <Select value={orderData.type} onValueChange={(value) => setOrderData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="credit">Credit</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Line Strip */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add Parts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
            <div>
              <Label htmlFor="partName">Part Name</Label>
              <div className="relative">
                <Input
                  id="partName"
                  placeholder="Search/Barcode"
                  value={newLine.partName}
                  onChange={(e) => setNewLine(prev => ({ ...prev, partName: e.target.value }))}
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              </div>
            </div>

            <div>
              <Label htmlFor="qty">Qty</Label>
              <Input
                id="qty"
                type="number"
                value={newLine.qty}
                onChange={(e) => setNewLine(prev => ({ ...prev, qty: parseInt(e.target.value) || 1 }))}
                min="1"
              />
            </div>

            <div>
              <Label htmlFor="partPrice">Part Price</Label>
              <Input
                id="partPrice"
                type="number"
                step="0.01"
                value={newLine.partPrice}
                onChange={(e) => setNewLine(prev => ({ ...prev, partPrice: parseFloat(e.target.value) || 0 }))}
              />
            </div>

            <div>
              <Label htmlFor="priceType">Price Type</Label>
              <Select value={newLine.priceType} onValueChange={(value) => setNewLine(prev => ({ ...prev, priceType: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mrp">MRP</SelectItem>
                  <SelectItem value="cost">Cost</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="serviceLabour">Service/Labour</Label>
              <Select value={newLine.serviceLabour} onValueChange={(value) => setNewLine(prev => ({ ...prev, serviceLabour: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="service">Service</SelectItem>
                  <SelectItem value="labour">Labour</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={addOrderLine}>
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-2">
            Parts and Labour selected here will be updated to the Job Card.
          </p>
        </CardContent>
      </Card>

      {/* Order Lines Table */}
      {orderLines.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">#</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Part Name</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Part No</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Brand</th>
                    <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">Requested Qty</th>
                    <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">Size/Qty</th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Unit Price</th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Discount</th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Tax %</th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Total Purchase Price</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {orderLines.map((line, index) => (
                    <tr key={line.id} className={`border-b hover:bg-muted/50 ${index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}`}>
                      <td className="py-3 px-2 text-sm text-foreground">{index + 1}</td>
                      <td className="py-3 px-2 text-sm text-foreground">{line.partName}</td>
                      <td className="py-3 px-2 text-sm text-foreground">{line.partNo}</td>
                      <td className="py-3 px-2 text-sm text-foreground">{line.brand}</td>
                      <td className="py-3 px-2 text-sm text-center text-foreground">{line.requestedQty}</td>
                      <td className="py-3 px-2 text-sm text-center text-foreground">{line.sizeQty}</td>
                      <td className="py-3 px-2 text-sm text-right text-foreground">₹{line.unitPrice.toFixed(2)}</td>
                      <td className="py-3 px-2 text-sm text-right text-foreground">₹{line.discount.toFixed(2)}</td>
                      <td className="py-3 px-2 text-sm text-right text-foreground">{line.taxPercent}%</td>
                      <td className="py-3 px-2 text-sm text-right text-foreground">₹{line.totalPurchasePrice.toFixed(2)}</td>
                      <td className="py-3 px-2 text-sm text-foreground">{line.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end mt-4">
              <div className="text-right">
                <p className="text-lg font-bold">Total Order Value: ₹{getTotalOrderValue().toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Footer Actions */}
      <div className="flex justify-between">
        <Button variant="ghost" onClick={() => navigate('/parts')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button variant="brand" onClick={handleBuyNow}>
          Buy Now
        </Button>
      </div>
    </div>
  );
};

export default PartsOrder;