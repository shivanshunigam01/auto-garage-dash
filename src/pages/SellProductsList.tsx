import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SellProductsItem {
  id: string;
  counterSaleNo: string;
  regNo: string;
  customerName: string;
  mobileNo: string;
  billNo: string;
  billDate: string;
  totalAmount: number;
  paid: number;
  balance: number;
  status: 'Invoice' | 'Estimation' | 'Pre-Invoice';
}

const SellProductsList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const salesData: SellProductsItem[] = [
    {
      id: '1',
      counterSaleNo: 'CS-001',
      regNo: 'ABC-1234',
      customerName: 'Ahmed Khan',
      mobileNo: '+260-987654321',
      billNo: 'B-001',
      billDate: '2024-01-15',
      totalAmount: 1500.00,
      paid: 1500.00,
      balance: 0.00,
      status: 'Invoice'
    },
    {
      id: '2',
      counterSaleNo: 'CS-002',
      regNo: 'XYZ-5678',
      customerName: 'Sarah Wilson',
      mobileNo: '+260-123456789',
      billNo: 'B-002',
      billDate: '2024-01-14',
      totalAmount: 2800.00,
      paid: 1400.00,
      balance: 1400.00,
      status: 'Estimation'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Invoice':
        return 'bg-status-invoice';
      case 'Estimation':
        return 'bg-status-estimate';
      case 'Pre-Invoice':
        return 'bg-status-progress';
      default:
        return 'bg-muted-foreground';
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Invoice':
        return 'default';
      case 'Estimation':
        return 'secondary';
      case 'Pre-Invoice':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const filteredData = salesData.filter(item =>
    item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.regNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.billNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.mobileNo.includes(searchTerm)
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Sell Products</h1>
          <p className="text-muted-foreground">Manage product sales and invoicing</p>
        </div>
        <Button 
          variant="brand" 
          onClick={() => navigate('/sell-products/create')}
        >
          Sell Products
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search by customer, reg no, bill no..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Sales Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg text-foreground">Sales List</CardTitle>
            <div className="text-sm text-muted-foreground">
              1 - {filteredData.length} of {salesData.length}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Counter Sale No.</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Reg. No.</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Customer Name</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Mobile No.</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Bill No.</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Bill Date</th>
                  <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Total Amount</th>
                  <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Paid</th>
                  <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Balance</th>
                  <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">Download</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={item.id} className={`border-b hover:bg-muted/50 ${index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}`}>
                    <td className="py-3 px-2 text-sm text-foreground">{item.counterSaleNo}</td>
                    <td className="py-3 px-2 text-sm text-foreground">{item.regNo}</td>
                    <td className="py-3 px-2 text-sm text-foreground">{item.customerName}</td>
                    <td className="py-3 px-2 text-sm text-foreground">{item.mobileNo}</td>
                    <td className="py-3 px-2 text-sm text-foreground">{item.billNo}</td>
                    <td className="py-3 px-2 text-sm text-foreground">{item.billDate}</td>
                    <td className="py-3 px-2 text-sm text-right text-foreground">₹{item.totalAmount.toFixed(2)}</td>
                    <td className="py-3 px-2 text-sm text-right text-foreground">₹{item.paid.toFixed(2)}</td>
                    <td className="py-3 px-2 text-sm text-right text-foreground">₹{item.balance.toFixed(2)}</td>
                    <td className="py-3 px-2">
                      <div className="flex items-center justify-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(item.status)}`}></div>
                        <Badge variant={getStatusVariant(item.status)} className="text-xs">
                          {item.status}
                        </Badge>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex justify-center">
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">10 Rows</span>
              <Button variant="ghost" size="sm">▼</Button>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" disabled>Previous</Button>
              <Button variant="default" size="sm">1</Button>
              <Button variant="ghost" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellProductsList;