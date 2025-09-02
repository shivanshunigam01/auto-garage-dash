import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Plus } from 'lucide-react';

interface Invoice {
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
  status: 'Invoice' | 'Pre-invoice';
}

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const invoices: Invoice[] = [
    {
      id: '1',
      counterSaleNo: 'RR-C000007',
      regNo: '',
      customerName: 'salim',
      mobileNo: '******9999',
      billNo: 'RR-I00030',
      billDate: 'Aug 12 2025',
      totalAmount: 126000.00,
      paid: 100000.00,
      balance: 26000.00,
      status: 'Invoice'
    },
    {
      id: '2',
      counterSaleNo: 'RR-C000006',
      regNo: '123432TRT',
      customerName: 'Mohamed',
      mobileNo: '******4324',
      billNo: 'RR-I00028',
      billDate: 'Aug 9 2025',
      totalAmount: 568.40,
      paid: 0.00,
      balance: 568.40,
      status: 'Invoice'
    },
    {
      id: '3',
      counterSaleNo: 'RR-C000005',
      regNo: '',
      customerName: 'HELIOS LOGISTICS LIMITED',
      mobileNo: '******8409',
      billNo: 'RR-P00027',
      billDate: 'Aug 7 2025',
      totalAmount: 0.00,
      paid: 0.00,
      balance: 0.00,
      status: 'Pre-invoice'
    },
    {
      id: '4',
      counterSaleNo: 'RR-C000004',
      regNo: '',
      customerName: 'HELIOS LOGISTICS LIMITED',
      mobileNo: '******8409',
      billNo: 'RR-P00026',
      billDate: 'Aug 7 2025',
      totalAmount: 0.00,
      paid: 60.00,
      balance: -60.00,
      status: 'Pre-invoice'
    },
    {
      id: '5',
      counterSaleNo: 'RR-C000003',
      regNo: '',
      customerName: 'Shajan',
      mobileNo: '******5432',
      billNo: 'RR-I00016',
      billDate: 'Jul 23 2025',
      totalAmount: 1337.50,
      paid: 0.00,
      balance: 1337.50,
      status: 'Invoice'
    },
    {
      id: '6',
      counterSaleNo: 'RR-C000002',
      regNo: '',
      customerName: 'Test',
      mobileNo: '******2123',
      billNo: 'RR-P00016',
      billDate: 'Jul 21 2025',
      totalAmount: 315.00,
      paid: 0.00,
      balance: 315.00,
      status: 'Pre-invoice'
    },
    {
      id: '7',
      counterSaleNo: 'RR-C000001',
      regNo: '',
      customerName: 'Test',
      mobileNo: '******6764',
      billNo: 'RR-P00015',
      billDate: 'Jul 21 2025',
      totalAmount: 0.00,
      paid: 0.00,
      balance: 0.00,
      status: 'Pre-invoice'
    }
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Invoice':
        return 'default';
      case 'Pre-invoice':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Invoice':
        return 'bg-status-invoice';
      case 'Pre-invoice':
        return 'bg-status-delivered';
      default:
        return 'bg-muted-foreground';
    }
  };

  const filteredInvoices = invoices.filter(invoice =>
    invoice.counterSaleNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.billNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.mobileNo.includes(searchTerm)
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Sell Products</h1>
          <p className="text-muted-foreground">Manage sales invoices and transactions</p>
        </div>
        <Button variant="brand" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Sell Products
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Sales Records</CardTitle>
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
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice, index) => (
                  <tr key={invoice.id} className={`border-b hover:bg-muted/50 ${index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}`}>
                    <td className="py-3 px-2 text-sm text-foreground">{invoice.counterSaleNo}</td>
                    <td className="py-3 px-2 text-sm text-foreground">{invoice.regNo}</td>
                    <td className="py-3 px-2 text-sm text-foreground">{invoice.customerName}</td>
                    <td className="py-3 px-2 text-sm text-foreground">{invoice.mobileNo}</td>
                    <td className="py-3 px-2 text-sm text-foreground">{invoice.billNo}</td>
                    <td className="py-3 px-2 text-sm text-foreground">{invoice.billDate}</td>
                    <td className="py-3 px-2 text-sm text-right text-foreground">
                      {invoice.totalAmount.toFixed(2)}
                    </td>
                    <td className="py-3 px-2 text-sm text-right text-foreground">
                      {invoice.paid.toFixed(2)}
                    </td>
                    <td className="py-3 px-2 text-sm text-right text-foreground">
                      {invoice.balance.toFixed(2)}
                    </td>
                    <td className="py-3 px-2 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(invoice.status)}`}></div>
                        <Badge variant={getStatusVariant(invoice.status)} className="text-xs">
                          {invoice.status}
                        </Badge>
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
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>1 - 7 of 7</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Invoices;