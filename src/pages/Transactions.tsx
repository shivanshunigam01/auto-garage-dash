import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Plus, Upload, Printer, Search } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [newExpense, setNewExpense] = useState({
    expenseType: '',
    vendorName: '',
    billNo: '',
    billDate: '',
    invoiceAmount: '',
    amountPaid: '',
    paymentMode: '',
    remarks: '',
    registrationNo: ''
  });

  // Mock transaction totals
  const transactionTotals = {
    totalExpenses: 125000,
    totalPaid: 98000,
    totalPayable: 27000
  };

  // Mock expenses data
  const expensesData = [
    {
      id: 1,
      expenseType: 'SW: Salaries and Wages',
      vendorName: 'Staff Payroll',
      voucherNo: 'V-001',
      billNo: 'PAY-001',
      billDate: '2024-01-15',
      invoiceAmount: 45000,
      amountPaid: 45000,
      payable: 0,
      remarks: 'Monthly salary'
    },
    {
      id: 2,
      expenseType: 'Utilities',
      vendorName: 'Power Company Ltd',
      voucherNo: 'V-002',
      billNo: 'ELEC-2024-01',
      billDate: '2024-01-10',
      invoiceAmount: 8500,
      amountPaid: 8500,
      payable: 0,
      remarks: 'Electricity bill'
    },
    {
      id: 3,
      expenseType: 'Parts Purchase',
      vendorName: 'Auto Parts Supplier',
      voucherNo: 'V-003',
      billNo: 'AP-001',
      billDate: '2024-01-12',
      invoiceAmount: 25000,
      amountPaid: 15000,
      payable: 10000,
      remarks: 'Brake pads and filters'
    }
  ];

  const handleAddExpense = () => {
    if (!newExpense.expenseType || !newExpense.vendorName || !newExpense.billNo) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in expense type, vendor name, and bill number",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Expense Added",
      description: `Expense for ${newExpense.vendorName} has been recorded`
    });

    // Reset form
    setNewExpense({
      expenseType: '',
      vendorName: '',
      billNo: '',
      billDate: '',
      invoiceAmount: '',
      amountPaid: '',
      paymentMode: '',
      remarks: '',
      registrationNo: ''
    });
  };

  const filteredExpenses = expensesData.filter(expense =>
    expense.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.expenseType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.billNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Transactions</h1>
          <p className="text-muted-foreground">Manage expenses, payments, and collections</p>
        </div>
      </div>

      {/* Transaction Totals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">₹{transactionTotals.totalExpenses.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Expenses</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">₹{transactionTotals.totalPaid.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Paid</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">₹{transactionTotals.totalPayable.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Payable</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="expenses">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
          <TabsTrigger value="bank-deposit">Bank Deposit</TabsTrigger>
        </TabsList>

        <TabsContent value="expenses" className="space-y-6">
          {/* Add Expense Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add New Expense</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 items-end">
                <div>
                  <Label>Expense Type</Label>
                  <Select 
                    value={newExpense.expenseType} 
                    onValueChange={(value) => setNewExpense(prev => ({ ...prev, expenseType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sw">SW: Salaries and Wages</SelectItem>
                      <SelectItem value="utilities">Utilities</SelectItem>
                      <SelectItem value="rent">Rent</SelectItem>
                      <SelectItem value="parts">Parts Purchase</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Vendor Name</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Vendor name"
                      value={newExpense.vendorName}
                      onChange={(e) => setNewExpense(prev => ({ ...prev, vendorName: e.target.value }))}
                    />
                    <Button variant="outline" size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>Bill No.</Label>
                  <Input
                    placeholder="Bill number"
                    value={newExpense.billNo}
                    onChange={(e) => setNewExpense(prev => ({ ...prev, billNo: e.target.value }))}
                  />
                </div>

                <div>
                  <Label>Bill Date</Label>
                  <Input
                    type="date"
                    value={newExpense.billDate}
                    onChange={(e) => setNewExpense(prev => ({ ...prev, billDate: e.target.value }))}
                  />
                </div>

                <div>
                  <Label>Invoice Amount</Label>
                  <Input
                    type="number"
                    placeholder="Amount"
                    value={newExpense.invoiceAmount}
                    onChange={(e) => setNewExpense(prev => ({ ...prev, invoiceAmount: e.target.value }))}
                  />
                </div>

                <div>
                  <Label>Amount Paid</Label>
                  <Input
                    type="number"
                    placeholder="Paid amount"
                    value={newExpense.amountPaid}
                    onChange={(e) => setNewExpense(prev => ({ ...prev, amountPaid: e.target.value }))}
                  />
                </div>

                <div>
                  <Label>Payment Mode</Label>
                  <Select 
                    value={newExpense.paymentMode} 
                    onValueChange={(value) => setNewExpense(prev => ({ ...prev, paymentMode: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="upi">UPI</SelectItem>
                      <SelectItem value="card">Card</SelectItem>
                      <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                      <SelectItem value="cheque">Cheque</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Remarks</Label>
                  <Input
                    placeholder="Remarks"
                    value={newExpense.remarks}
                    onChange={(e) => setNewExpense(prev => ({ ...prev, remarks: e.target.value }))}
                  />
                </div>

                <div>
                  <Label>Registration No.</Label>
                  <Input
                    placeholder="Optional"
                    value={newExpense.registrationNo}
                    onChange={(e) => setNewExpense(prev => ({ ...prev, registrationNo: e.target.value }))}
                  />
                </div>

                <Button onClick={handleAddExpense}>
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Expenses Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Expenses List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">#</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Expense Type</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Vendor Name</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Voucher No.</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Bill No.</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Bill Date</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Invoice Amount</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Amount Paid</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Payable</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Remarks</th>
                      <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">Upload</th>
                      <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">Print</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExpenses.map((expense, index) => (
                      <tr key={expense.id} className={`border-b hover:bg-muted/50 ${index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}`}>
                        <td className="py-3 px-2 text-sm text-foreground">{expense.id}</td>
                        <td className="py-3 px-2 text-sm text-foreground">{expense.expenseType}</td>
                        <td className="py-3 px-2 text-sm text-foreground">{expense.vendorName}</td>
                        <td className="py-3 px-2 text-sm text-foreground">{expense.voucherNo}</td>
                        <td className="py-3 px-2 text-sm text-foreground">{expense.billNo}</td>
                        <td className="py-3 px-2 text-sm text-foreground">{expense.billDate}</td>
                        <td className="py-3 px-2 text-sm text-right text-foreground">₹{expense.invoiceAmount.toLocaleString()}</td>
                        <td className="py-3 px-2 text-sm text-right text-foreground">₹{expense.amountPaid.toLocaleString()}</td>
                        <td className="py-3 px-2 text-sm text-right text-foreground">₹{expense.payable.toLocaleString()}</td>
                        <td className="py-3 px-2 text-sm text-foreground">{expense.remarks}</td>
                        <td className="py-3 px-2 text-center">
                          <Button variant="ghost" size="sm">
                            <Upload className="w-4 h-4" />
                          </Button>
                        </td>
                        <td className="py-3 px-2 text-center">
                          <Button variant="ghost" size="sm">
                            <Printer className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">Payments module coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collections">
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">Collections module coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bank-deposit">
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">Bank deposit module coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Transactions;