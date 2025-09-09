import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Package, 
  FileText,
  Download,
  Calendar,
  Filter
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Reports = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Mock data for charts
  const monthlyRevenueData = [
    { name: 'Jan', revenue: 45000, expenses: 32000 },
    { name: 'Feb', revenue: 52000, expenses: 35000 },
    { name: 'Mar', revenue: 48000, expenses: 31000 },
    { name: 'Apr', revenue: 61000, expenses: 42000 },
    { name: 'May', revenue: 55000, expenses: 38000 },
    { name: 'Jun', revenue: 67000, expenses: 45000 }
  ];

  const serviceTypeData = [
    { name: 'General Service', value: 35, color: '#0088FE' },
    { name: 'Oil Change', value: 25, color: '#00C49F' },
    { name: 'Brake Service', value: 20, color: '#FFBB28' },
    { name: 'Engine Repair', value: 12, color: '#FF8042' },
    { name: 'Other', value: 8, color: '#8884D8' }
  ];

  const reportCategories = [
    {
      id: 'income',
      title: 'Income Reports',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      reports: [
        'By Make', 'By Customer Type', 'By Parts & Services', 
        'By Type of Services', 'By Type of Sale', 'By Insurer', 
        'Sales Register', 'Collections'
      ]
    },
    {
      id: 'expenses',
      title: 'Expense Reports',
      icon: TrendingUp,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      reports: [
        'By Expense Type', 'By Vendor', 'Payments'
      ]
    },
    {
      id: 'operations',
      title: 'Operations Reports',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      reports: [
        'Work In Progress', 'By Status', 'By Make', 'Vehicle Report',
        'NPS Feedback Report', 'Credit Note', 'Debit Note', 
        'Clock-In / Clock-Out', 'Daily Summary', 'Daily Usage',
        'All Invoices', 'AMC Report', 'Technician Tracking',
        'Technician Performance Report', 'Book Appointment'
      ]
    },
    {
      id: 'inventory',
      title: 'Inventory Reports',
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      reports: [
        'Stock By Parts', 'Stock By Brand', 'Stock By Vendor',
        'Stock By Issue', 'Spares Pending', 'Purchase Orders',
        'Purchase Return', 'Open vs Closing Stock'
      ]
    }
  ];

  const kpiData = [
    {
      title: 'Total Revenue',
      value: '₹3,28,000',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign
    },
    {
      title: 'Active Customers',
      value: '1,247',
      change: '+8.2%',
      trend: 'up',
      icon: Users
    },
    {
      title: 'Completed Jobs',
      value: '156',
      change: '+15.3%',
      trend: 'up',
      icon: FileText
    },
    {
      title: 'Inventory Value',
      value: '₹85,670',
      change: '-2.1%',
      trend: 'down',
      icon: Package
    }
  ];

  return (
    <div className="flex h-full">
      {/* Left Sidebar - Report Categories */}
      <div className="w-80 bg-muted/30 p-4 border-r">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Reports</h2>
            <Button variant="ghost" size="sm">
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          {/* Default Dashboard View Button */}
          <Button 
            variant={selectedCategory === null ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setSelectedCategory(null)}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            View Dashboard
          </Button>

          {/* Report Categories */}
          <div className="space-y-2">
            {reportCategories.map((category) => (
              <div key={category.id}>
                <Button
                  variant={selectedCategory === category.id ? "default" : "ghost"}
                  className="w-full justify-start mb-2"
                  onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                >
                  <category.icon className={`w-4 h-4 mr-2 ${category.color}`} />
                  {category.title}
                </Button>
                
                {selectedCategory === category.id && (
                  <div className="ml-6 space-y-1">
                    {category.reports.map((report, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-xs text-muted-foreground hover:text-foreground"
                      >
                        {report}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6">
        {selectedCategory === null ? (
          /* Dashboard View */
          <>
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Reports Dashboard</h1>
                <p className="text-muted-foreground">Overview of business performance and analytics</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Last 30 Days
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {kpiData.map((kpi, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{kpi.title}</p>
                        <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                        <div className={`flex items-center text-sm ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          <TrendingUp className={`w-3 h-3 mr-1 ${kpi.trend === 'down' ? 'rotate-180' : ''}`} />
                          {kpi.change}
                        </div>
                      </div>
                      <kpi.icon className="w-8 h-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue vs Expenses Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Revenue vs Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyRevenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                      <Bar dataKey="revenue" fill="#0088FE" name="Revenue" />
                      <Bar dataKey="expenses" fill="#FF8042" name="Expenses" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Service Type Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Service Type Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={serviceTypeData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {serviceTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Reports */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Monthly Sales Report', date: '2024-01-15', type: 'Income', status: 'Generated' },
                    { name: 'Inventory Stock Report', date: '2024-01-14', type: 'Inventory', status: 'Generated' },
                    { name: 'Technician Performance', date: '2024-01-13', type: 'Operations', status: 'In Progress' },
                    { name: 'Customer Feedback Report', date: '2024-01-12', type: 'Operations', status: 'Generated' }
                  ].map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">{report.name}</p>
                        <p className="text-sm text-muted-foreground">{report.date} • {report.type}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={report.status === 'Generated' ? 'default' : 'secondary'}>
                          {report.status}
                        </Badge>
                        {report.status === 'Generated' && (
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          /* Specific Category View */
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {reportCategories.find(cat => cat.id === selectedCategory)?.title}
                </h1>
                <p className="text-muted-foreground">Select a specific report to view detailed analytics</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export All
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reportCategories
                .find(cat => cat.id === selectedCategory)
                ?.reports.map((report, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded ${reportCategories.find(cat => cat.id === selectedCategory)?.bgColor}`}>
                          <FileText className={`w-5 h-5 ${reportCategories.find(cat => cat.id === selectedCategory)?.color}`} />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{report}</p>
                          <p className="text-sm text-muted-foreground">Click to generate</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;