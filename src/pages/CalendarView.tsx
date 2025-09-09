import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Plus, Eye } from 'lucide-react';
import AppointmentModal from '@/components/AppointmentModal';

interface Appointment {
  id: string;
  time: string;
  customer: string;
  service: string;
  vehicle: string;
  status: 'scheduled' | 'confirmed' | 'completed';
}

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 7, 27)); // August 27, 2025
  const [viewType, setViewType] = useState<'week' | 'month'>('week');
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  const appointments: Appointment[] = [
    {
      id: '1',
      time: '10:00 PM',
      customer: 'Ahmed Khan',
      service: 'General Service', 
      vehicle: 'Honda Civic',
      status: 'scheduled'
    }
  ];

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const timeSlots = [
    '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', 
    '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'
  ];

  const getWeekDates = () => {
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const formatDate = (date: Date) => {
    return date.getDate();
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentDay = (date: Date) => {
    return date.getDate() === 27 && date.getMonth() === 7; // August 27
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  const weekDates = getWeekDates();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Calendar</h1>
          <p className="text-muted-foreground">Manage appointments and scheduling</p>
        </div>
      </div>

      {/* Calendar Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigateWeek('prev')}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => navigateWeek('next')}>
            <ChevronRight className="w-4 h-4" />
          </Button>
          <h2 className="text-lg font-semibold text-foreground">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            Today
          </Button>
          <div className="flex bg-muted rounded-md p-1">
            <Button
              variant={viewType === 'week' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewType('week')}
            >
              Week
            </Button>
          </div>
          <Button
            variant="outline"
            className="text-muted-foreground"
          >
            Working Staff ▼
          </Button>
          <Button variant="brand" className="flex items-center gap-2" onClick={() => setShowAppointmentModal(true)}>
            <Plus className="w-4 h-4" />
            ADD NEW
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <Card>
        <CardContent className="p-0">
          <div className="grid grid-cols-8 border-b">
            {/* Time column header */}
            <div className="p-4 bg-muted/50 border-r"></div>
            
            {/* Day headers */}
            {weekDates.map((date, index) => (
              <div key={index} className="p-4 text-center border-r bg-muted/50">
                <div className="text-sm font-medium text-muted-foreground">
                  {weekDays[date.getDay()]}
                </div>
                <div className={`text-lg font-semibold mt-1 ${
                  isCurrentDay(date)
                    ? 'bg-brand-blue text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mx-auto'
                    : 'text-foreground'
                }`}>
                  {formatDate(date)}
                </div>
              </div>
            ))}
          </div>

          {/* Time slots */}
          {timeSlots.map((time, timeIndex) => (
            <div key={timeIndex} className="grid grid-cols-8 border-b min-h-[60px]">
              {/* Time label */}
              <div className="p-3 text-sm text-muted-foreground border-r bg-muted/30 flex items-center">
                {time}
              </div>
              
              {/* Day columns */}
              {weekDates.map((date, dayIndex) => (
                <div key={dayIndex} className="border-r hover:bg-muted/30 transition-colors relative">
                  {/* Show appointment if it matches this time slot and day */}
                  {time === '10 PM' && isCurrentDay(date) && (
                    <div className="absolute inset-1 bg-red-500 rounded p-1 text-xs text-white z-10">
                      <div className="font-medium">10:00 PM</div>
                      <div>Ahmed Khan</div>
                      <div>General Service</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Appointment Details */}
      {appointments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-foreground">Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-foreground">{appointment.time} - {appointment.customer}</p>
                      <p className="text-sm text-muted-foreground">{appointment.vehicle} - {appointment.service}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {appointment.status}
                    </Badge>
                    <Button size="sm" variant="ghost">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Appointment Modal */}
      <AppointmentModal 
        isOpen={showAppointmentModal} 
        onClose={() => setShowAppointmentModal(false)} 
      />
    </div>
  );
};

export default CalendarView;