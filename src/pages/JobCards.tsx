import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, Plus } from 'lucide-react';

interface JobCard {
  id: string;
  rfeNo: string;
  jobCardNo: string;
  regNo: string;
  invoiceNo: string;
  serviceType: string;
  vehicle: string;
  status: 'Invoice' | 'Estimation Req' | 'Delivered' | 'Work-In-Progress' | 'Spares Pending';
  customerName: string;
}

const JobCards = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('09/01/2024 - 08/31/2025');

  const statusCounts = {
    'Req for Estimation': { count: 2, total: 0, bgColor: 'bg-red-100', iconColor: 'text-red-500' },
    'Estimate': { count: 5, total: 442602, bgColor: 'bg-gray-100', iconColor: 'text-gray-500' },
    'Spares Pending': { count: 2, total: 1190, bgColor: 'bg-orange-100', iconColor: 'text-orange-500' },
    'Work-In-Progress': { count: 2, total: 2973, bgColor: 'bg-yellow-100', iconColor: 'text-yellow-600' },
    'Ready For Delivery': { count: 4, total: 2667, bgColor: 'bg-green-100', iconColor: 'text-green-500' }
  };

  const jobCards: JobCard[] = [
    {
      id: '1',
      rfeNo: '',
      jobCardNo: 'RR-J000036',
      regNo: '0490',
      invoiceNo: 'RR-I00035',
      serviceType: 'Detailing',
      vehicle: 'HYUNDAI SONATA',
      status: 'Invoice',
      customerName: 'Zenieth'
    },
    {
      id: '2',
      rfeNo: 'RR-E000011',
      jobCardNo: 'RR-J000035',
      regNo: '565HTY',
      invoiceNo: 'RR-I00034',
      serviceType: 'All',
      vehicle: 'Toyota Toyoace',
      status: 'Estimation Req',
      customerName: 'Mhmood'
    },
    {
      id: '3',
      rfeNo: '',
      jobCardNo: 'RR-J000034',
      regNo: '23254534',
      invoiceNo: 'RR-I00033',
      serviceType: '',
      vehicle: 'TOYOTA CAMRY',
      status: 'Invoice',
      customerName: 'Max'
    },
    {
      id: '4',
      rfeNo: '',
      jobCardNo: 'RR-J000033',
      regNo: '3456789',
      invoiceNo: 'RR-I00032',
      serviceType: '',
      vehicle: 'M & M BOLERO',
      status: 'Invoice',
      customerName: 'Mohammed'
    },
    {
      id: '5',
      rfeNo: '',
      jobCardNo: 'RR-J000032',
      regNo: '70 SSH',
      invoiceNo: '',
      serviceType: 'Breakdown',
      vehicle: 'MERCEDES E63 AMG',
      status: 'Delivered',
      customerName: 'Omar'
    }
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Invoice':
        return 'default';
      case 'Estimation Req':
        return 'secondary';
      case 'Delivered':
        return 'outline';
      case 'Work-In-Progress':
        return 'secondary';
      case 'Spares Pending':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Invoice':
        return 'bg-status-invoice';
      case 'Estimation Req':
        return 'bg-status-estimate';
      case 'Delivered':
        return 'bg-status-delivered';
      case 'Work-In-Progress':
        return 'bg-status-progress';
      case 'Spares Pending':
        return 'bg-status-pending';
      default:
        return 'bg-muted-foreground';
    }
  };

  const filteredJobCards = jobCards.filter(jobCard =>
    jobCard.jobCardNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    jobCard.regNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    jobCard.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    jobCard.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Job Cards</h1>
          <p className="text-muted-foreground">Manage vehicle service jobs and track progress</p>
        </div>
        <Button variant="brand" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Sell Products
        </Button>
      </div>

      {/* Date Range Picker */}
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-foreground">{dateRange}</span>
      </div>

      {/* Status Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {Object.entries(statusCounts).map(([status, data]) => (
          <Card key={status} className={`${data.bgColor} border-none`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded ${data.iconColor}`}>
                  {status === 'Req for Estimation' && (
                    <div className="w-6 h-6 bg-current rounded opacity-20"></div>
                  )}
                  {status === 'Estimate' && (
                    <div className="w-6 h-6 bg-current rounded opacity-20"></div>
                  )}
                  {status === 'Spares Pending' && (
                    <div className="w-6 h-6 bg-current rounded opacity-20"></div>
                  )}
                  {status === 'Work-In-Progress' && (
                    <div className="w-6 h-6 bg-current rounded opacity-20"></div>
                  )}
                  {status === 'Ready For Delivery' && (
                    <div className="w-6 h-6 bg-current rounded opacity-20"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-sm text-foreground">{status}</h3>
                  <p className="text-2xl font-bold text-foreground">{data.count}</p>
                  {data.total > 0 && (
                    <p className="text-sm text-muted-foreground">{data.total.toLocaleString()}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Customer Name / Mobile No / Vehicle No / Claim No"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Job Cards Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg text-foreground">Job Cards List</CardTitle>
            <div className="text-sm text-muted-foreground">
              1 - 10 of 42
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">RFE No.</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Job Card No.</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Reg. No.</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Invoice No.</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Service Type</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Vehicle</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Customer Name</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobCards.map((jobCard, index) => (
                  <tr key={jobCard.id} className={`border-b hover:bg-muted/50 ${index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}`}>
                    <td className="py-3 px-2 text-sm">
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <span className="sr-only">Expand</span>
                        ▼
                      </Button>
                    </td>
                    <td className="py-3 px-2 text-sm text-foreground">{jobCard.jobCardNo}</td>
                    <td className="py-3 px-2 text-sm text-foreground">{jobCard.regNo}</td>
                    <td className="py-3 px-2 text-sm text-foreground">{jobCard.invoiceNo}</td>
                    <td className="py-3 px-2 text-sm text-foreground">{jobCard.serviceType}</td>
                    <td className="py-3 px-2 text-sm text-foreground">{jobCard.vehicle}</td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(jobCard.status)}`}></div>
                        <Badge variant={getStatusVariant(jobCard.status)} className="text-xs">
                          {jobCard.status}
                        </Badge>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-sm text-foreground">{jobCard.customerName}</td>
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
              <Button variant="ghost" size="sm">2</Button>
              <Button variant="ghost" size="sm">3</Button>
              <Button variant="ghost" size="sm">4</Button>
              <Button variant="ghost" size="sm">5</Button>
              <Button variant="ghost" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobCards;