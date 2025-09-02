import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, DollarSign, Calendar, Package } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '₹2,45,680',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-success'
    },
    {
      title: 'Active Jobs',
      value: '23',
      change: '+3',
      icon: BarChart3,
      color: 'text-status-progress'
    },
    {
      title: 'Customers',
      value: '1,248',
      change: '+8.2%',
      icon: Users,
      color: 'text-brand-blue'
    },
    {
      title: 'Appointments',
      value: '15',
      change: 'Today',
      icon: Calendar,
      color: 'text-status-pending'
    },
    {
      title: 'Stock Items',
      value: '856',
      change: 'Available',
      icon: Package,
      color: 'text-status-delivered'
    },
    {
      title: 'Monthly Growth',
      value: '24.8%',
      change: '+5.2%',
      icon: TrendingUp,
      color: 'text-success'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your garage management system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className={`text-xs ${stat.color}`}>
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Recent Job Cards</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">RR-J000{item + 30}</p>
                  <p className="text-sm text-muted-foreground">Toyota Camry - Oil Change</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">₹2,500</p>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-status-progress rounded-full mr-2"></div>
                    <span className="text-xs text-muted-foreground">In Progress</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Today's Appointments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { time: '10:00 AM', customer: 'Ahmed Khan', service: 'General Service', vehicle: 'Honda Civic' },
              { time: '2:00 PM', customer: 'Sarah Ali', service: 'Brake Check', vehicle: 'Toyota Corolla' },
              { time: '4:30 PM', customer: 'Mohamed Rashid', service: 'AC Repair', vehicle: 'Nissan Altima' }
            ].map((appointment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{appointment.customer}</p>
                  <p className="text-sm text-muted-foreground">{appointment.vehicle} - {appointment.service}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{appointment.time}</p>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-status-estimate rounded-full mr-2"></div>
                    <span className="text-xs text-muted-foreground">Scheduled</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;