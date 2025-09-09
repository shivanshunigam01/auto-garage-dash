import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Search, Download, Bell, Calendar, Users, Car } from 'lucide-react';
import KpiCard from '@/components/KpiCard';

const Reminders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [reminderType, setReminderType] = useState('all');
  const [selectType, setSelectType] = useState('all');
  const [dateRange, setDateRange] = useState('2024-01-01 to 2024-12-31');

  // Mock KPI data
  const kpiData = [
    {
      title: 'Reminders Sent',
      count: 245,
      icon: Bell,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Reminders Due',
      count: 67,
      icon: Calendar,
      bgColor: 'bg-orange-50', 
      iconColor: 'text-orange-600'
    },
    {
      title: 'Vehicles Received',
      count: 89,
      icon: Car,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      title: 'Service Due',
      count: 23,
      icon: Users,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    }
  ];

  // Mock reminders data
  const remindersData = [
    {
      id: 1,
      customerName: 'Ahmed Khan',
      regNo: 'ABC-1234',
      vehicle: 'Honda Civic 2020',
      vehicleType: 'Sedan',
      mobile: '+260-987654321',
      jobCardNo: 'JC-001',
      odometerIn: 45000,
      odometerOut: 45180,
      deliveryDate: '2024-01-15',
      serviceType: 'General Service',
      pollutionCheck: '2024-06-15',
      nextServiceDate: '2024-07-15',
      firstReminderDate: '2024-07-01',
      totalRemindersSent: 3,
      reminderType: 'Service Reminder'
    },
    {
      id: 2,
      customerName: 'Sarah Wilson',
      regNo: 'XYZ-5678',
      vehicle: 'Toyota Camry 2019',
      vehicleType: 'Sedan',
      mobile: '+260-123456789',
      jobCardNo: 'JC-002',
      odometerIn: 62000,
      odometerOut: 62150,
      deliveryDate: '2024-01-10',
      serviceType: 'Oil Change',
      pollutionCheck: '2024-05-20',
      nextServiceDate: '2024-06-10',
      firstReminderDate: '2024-05-25',
      totalRemindersSent: 2,
      reminderType: 'Pollution Check'
    }
  ];

  const filteredReminders = remindersData.filter(reminder => {
    const matchesSearch = reminder.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reminder.regNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reminder.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reminder.mobile.includes(searchTerm);
    
    const matchesReminderType = reminderType === 'all' || 
                               reminder.reminderType.toLowerCase().includes(reminderType.toLowerCase());
    
    return matchesSearch && matchesReminderType;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reminders</h1>
          <p className="text-muted-foreground">Manage service reminders and customer notifications</p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <Label>Reminder Type</Label>
              <Select value={reminderType} onValueChange={setReminderType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="service">Service Reminder</SelectItem>
                  <SelectItem value="pollution">Pollution Check</SelectItem>
                  <SelectItem value="license">License Expiry</SelectItem>
                  <SelectItem value="control">Control Technique</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Select Type</Label>
              <Select value={selectType} onValueChange={setSelectType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="due">Due</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Date Range</Label>
              <Input value={dateRange} onChange={(e) => setDateRange(e.target.value)} />
            </div>

            <div className="flex gap-2">
              <Button variant="outline">Apply Filters</Button>
              <Button variant="ghost">Clear</Button>
            </div>
          </div>

          {/* SMS Usage Gauge */}
          <div className="mt-4 p-4 bg-muted/30 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Notifications Usage (SMS)</span>
              <span className="text-sm text-muted-foreground">750 / 1000 used</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div className="bg-brand-blue h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <KpiCard
            key={index}
            title={kpi.title}
            count={kpi.count}
            icon={kpi.icon}
            bgColor={kpi.bgColor}
            iconColor={kpi.iconColor}
          />
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search customer, vehicle, registration..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Reminders Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg text-foreground">Reminders List</CardTitle>
            <div className="text-sm text-muted-foreground">
              1 - {filteredReminders.length} of {remindersData.length}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">#</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Customer Name</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Reg. No.</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Vehicle</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Vehicle Type</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Mobile</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Job Card No.</th>
                  <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Odometer In</th>
                  <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Odometer Out</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Delivery Date</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Service Type</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Pollution Check</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Next Service Date</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">First Reminder Date</th>
                  <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">Total Reminder SMS/Email Sent</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Reminder Type</th>
                </tr>
              </thead>
              <tbody>
                {filteredReminders.map((reminder, index) => (
                  <tr key={reminder.id} className={`border-b hover:bg-muted/50 ${index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}`}>
                    <td className="py-3 px-2 text-sm text-foreground">{reminder.id}</td>
                    <td className="py-3 px-2 text-sm text-foreground">{reminder.customerName}</td>
                    <td className="py-3 px-2 text-sm text-foreground">{reminder.regNo}</td>
                    <td className="py-3 px-2 text-sm text-foreground">{reminder.vehicle}</td>
                    <td className="py-3 px-2 text-sm text-foreground">{reminder.vehicleType}</td>
                    <td className="py-3 px-2 text-sm text-foreground">{reminder.mobile}</td>
                    <td className="py-3 px-2 text-sm text-foreground">{reminder.jobCardNo}</td>
                    <td className="py-3 px-2 text-sm text-right text-foreground">{reminder.odometerIn.toLocaleString()}</td>
                    <td className="py-3 px-2 text-sm text-right text-foreground">{reminder.odometerOut.toLocaleString()}</td>
                    <td className="py-3 px-2 text-sm text-foreground">{reminder.deliveryDate}</td>
                    <td className="py-3 px-2 text-sm text-foreground">{reminder.serviceType}</td>
                    <td className="py-3 px-2 text-sm text-foreground">{reminder.pollutionCheck}</td>
                    <td className="py-3 px-2 text-sm text-foreground">{reminder.nextServiceDate}</td>
                    <td className="py-3 px-2 text-sm text-foreground">{reminder.firstReminderDate}</td>
                    <td className="py-3 px-2 text-sm text-center text-foreground">{reminder.totalRemindersSent}</td>
                    <td className="py-3 px-2">
                      <Badge variant="outline" className="text-xs">
                        {reminder.reminderType}
                      </Badge>
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

export default Reminders;