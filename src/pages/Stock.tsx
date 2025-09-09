import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Download, ArrowLeft } from 'lucide-react';

const Stock = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('stock');

  // Mock data for different tabs
  const stockData = [
    {
      id: 1,
      partNo: 'U-ALL-2519',
      partName: 'FILTER, OIL',
      brand: 'Bosch',
      category: 'Filters',
      qoh: 25,
      avgPurchasePrice: 45.00,
      avgSellingPrice: 55.00,
      taxType: 'GST',
      taxPercent: 18,
      taxAmount: 9.90,
      rackNo: 'R-01',
      ageing: '30 days',
      barcode: 'BC001'
    },
    {
      id: 2,
      partNo: 'T-MRF-185',
      partName: 'TYRE, TUBELESS 185/65R15',
      brand: 'MRF',
      category: 'Tyres',
      qoh: 12,
      avgPurchasePrice: 2400.00,
      avgSellingPrice: 2850.00,
      taxType: 'GST',
      taxPercent: 28,
      taxAmount: 798.00,
      rackNo: 'R-05',
      ageing: '15 days',
      barcode: 'BC002'
    }
  ];

  const orderData = [
    {
      id: 1,
      orderNo: 'ORD-001',
      orderDate: '2024-01-15',
      regNo: 'ABC-1234',
      jobCardNo: 'JC-001',
      vendorName: 'Auto Parts Ltd',
      orderValue: 5000.00,
      orderedParts: 5,
      inwardedParts: 3,
      rejectedParts: 0,
      pendingParts: 2,
      cancelDate: '',
      status: 'Partial'
    }
  ];

  const summaryData = {
    uniquePartNos: 156,
    totalStockItems: 2847,
    stockValue: 285670.50
  };

  const renderStockTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">#</th>
            <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Part No.</th>
            <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Part Name</th>
            <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Brand</th>
            <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Category</th>
            <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">QoH</th>
            <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Avg Purchase Price</th>
            <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Avg Selling Price</th>
            <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Tax Type</th>
            <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Tax %</th>
            <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Tax Amt</th>
            <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Rack No.</th>
            <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Ageing</th>
            <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Barcode</th>
          </tr>
        </thead>
        <tbody>
          {stockData.map((item, index) => (
            <tr key={item.id} className={`border-b hover:bg-muted/50 ${index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}`}>
              <td className="py-3 px-2 text-sm text-foreground">{item.id}</td>
              <td className="py-3 px-2 text-sm text-foreground">{item.partNo}</td>
              <td className="py-3 px-2 text-sm text-foreground">{item.partName}</td>
              <td className="py-3 px-2 text-sm text-foreground">{item.brand}</td>
              <td className="py-3 px-2 text-sm text-foreground">{item.category}</td>
              <td className="py-3 px-2 text-sm text-right text-foreground">{item.qoh}</td>
              <td className="py-3 px-2 text-sm text-right text-foreground">₹{item.avgPurchasePrice.toFixed(2)}</td>
              <td className="py-3 px-2 text-sm text-right text-foreground">₹{item.avgSellingPrice.toFixed(2)}</td>
              <td className="py-3 px-2 text-sm text-foreground">{item.taxType}</td>
              <td className="py-3 px-2 text-sm text-right text-foreground">{item.taxPercent}%</td>
              <td className="py-3 px-2 text-sm text-right text-foreground">₹{item.taxAmount.toFixed(2)}</td>
              <td className="py-3 px-2 text-sm text-foreground">{item.rackNo}</td>
              <td className="py-3 px-2 text-sm text-foreground">{item.ageing}</td>
              <td className="py-3 px-2 text-sm text-foreground">{item.barcode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderOrderTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">#</th>
            <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Order No.</th>
            <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Order Date</th>
            <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Reg. No.</th>
            <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Job Card No.</th>
            <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Vendor Name</th>
            <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Order Value</th>
            <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">Ordered Parts</th>
            <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">Inwarded Parts</th>
            <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">Rejected Parts</th>
            <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">Pending Parts</th>
            <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Status</th>
            <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">Action</th>
          </tr>
        </thead>
        <tbody>
          {orderData.map((item, index) => (
            <tr key={item.id} className={`border-b hover:bg-muted/50 ${index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}`}>
              <td className="py-3 px-2 text-sm text-foreground">{item.id}</td>
              <td className="py-3 px-2 text-sm text-foreground">{item.orderNo}</td>
              <td className="py-3 px-2 text-sm text-foreground">{item.orderDate}</td>
              <td className="py-3 px-2 text-sm text-foreground">{item.regNo}</td>
              <td className="py-3 px-2 text-sm text-foreground">{item.jobCardNo}</td>
              <td className="py-3 px-2 text-sm text-foreground">{item.vendorName}</td>
              <td className="py-3 px-2 text-sm text-right text-foreground">₹{item.orderValue.toFixed(2)}</td>
              <td className="py-3 px-2 text-sm text-center text-foreground">{item.orderedParts}</td>
              <td className="py-3 px-2 text-sm text-center text-foreground">{item.inwardedParts}</td>
              <td className="py-3 px-2 text-sm text-center text-foreground">{item.rejectedParts}</td>
              <td className="py-3 px-2 text-sm text-center text-foreground">{item.pendingParts}</td>
              <td className="py-3 px-2">
                <Badge variant="secondary" className="text-xs">{item.status}</Badge>
              </td>
              <td className="py-3 px-2 text-center">
                <Button variant="ghost" size="sm" className="text-xs">
                  Inward →
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Stock Management</h1>
          <p className="text-muted-foreground">Manage inventory, orders, and stock tracking</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards - Only show for Stock tab */}
      {activeTab === 'stock' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{summaryData.uniquePartNos}</p>
                <p className="text-sm text-muted-foreground">Unique Part Nos.</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{summaryData.totalStockItems}</p>
                <p className="text-sm text-muted-foreground">Total Stock Items</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">₹{summaryData.stockValue.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Stock Value</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="stock">Stock</TabsTrigger>
          <TabsTrigger value="order">Order</TabsTrigger>
          <TabsTrigger value="inward">Inward</TabsTrigger>
          <TabsTrigger value="issued">Issued</TabsTrigger>
          <TabsTrigger value="purchase-return">Purchase Return</TabsTrigger>
          <TabsTrigger value="stock-alert">Stock Alert</TabsTrigger>
        </TabsList>

        {/* Search */}
        <div className="flex gap-4 items-center mt-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search parts, orders, vendors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <TabsContent value="stock">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Stock List</CardTitle>
            </CardHeader>
            <CardContent>
              {renderStockTable()}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="order">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Purchase Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {renderOrderTable()}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inward">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Inward Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">Inward stock tracking coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issued">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Issued Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">Issued stock tracking coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="purchase-return">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Purchase Returns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">Purchase return tracking coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stock-alert">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Stock Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">Stock alert notifications coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Back Link */}
      <div className="flex justify-start">
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>
    </div>
  );
};

export default Stock;