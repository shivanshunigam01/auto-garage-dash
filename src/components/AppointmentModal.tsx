import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { X, Search } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    customerType: 'individual', // individual or corporate
    registrationNo: '',
    vehicle: '',
    customerName: '',
    mobileNumber: '',
    email: '',
    service: '',
    serviceAdvisor: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.date || !formData.customerName || !formData.mobileNumber || !formData.registrationNo) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields marked with *",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Appointment Booked",
      description: `Appointment for ${formData.customerName} has been successfully booked.`
    });
    
    // Reset form and close modal
    setFormData({
      date: '',
      startTime: '',
      endTime: '',
      customerType: 'individual',
      registrationNo: '',
      vehicle: '',
      customerName: '',
      mobileNumber: '',
      email: '',
      service: '',
      serviceAdvisor: ''
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border-l-4 border-l-brand-blue">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">New Appointment</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search Using Customer Name / Corporate Name / Mobile No. / Email / Reg. No. / VIN"
              className="pl-10"
            />
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date */}
            <div>
              <Label htmlFor="date">Select Date *</Label>
              <Input 
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                required
              />
            </div>

            {/* Time Range */}
            <div className="space-y-2">
              <Label>Time Range</Label>
              <div className="flex gap-2 items-center">
                <Input 
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                  className="flex-1"
                />
                <span className="text-muted-foreground">–</span>
                <Input 
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                  className="flex-1"
                />
              </div>
            </div>

            {/* Customer Type Toggle */}
            <div className="md:col-span-2 flex items-center gap-4">
              <Label>Customer Type:</Label>
              <div className="flex items-center gap-2">
                <span className={formData.customerType === 'individual' ? 'font-medium' : 'text-muted-foreground'}>
                  Individual
                </span>
                <Switch 
                  checked={formData.customerType === 'corporate'}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, customerType: checked ? 'corporate' : 'individual' }))
                  }
                />
                <span className={formData.customerType === 'corporate' ? 'font-medium' : 'text-muted-foreground'}>
                  Corporate
                </span>
              </div>
            </div>

            {/* Registration No */}
            <div>
              <Label htmlFor="regNo">Registration No. *</Label>
              <Input 
                id="regNo"
                value={formData.registrationNo}
                onChange={(e) => setFormData(prev => ({ ...prev, registrationNo: e.target.value }))}
                placeholder="Enter registration number"
                required
              />
            </div>

            {/* Vehicle */}
            <div>
              <Label htmlFor="vehicle">Vehicle</Label>
              <div className="relative">
                <Input 
                  id="vehicle"
                  value={formData.vehicle}
                  onChange={(e) => setFormData(prev => ({ ...prev, vehicle: e.target.value }))}
                  placeholder="Find a vehicle"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              </div>
            </div>

            {/* Customer Name */}
            <div>
              <Label htmlFor="customerName">Customer Name *</Label>
              <Input 
                id="customerName"
                value={formData.customerName}
                onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                placeholder="Enter customer name"
                required
              />
            </div>

            {/* Mobile Number */}
            <div>
              <Label htmlFor="mobile">Mobile Number *</Label>
              <div className="flex gap-2">
                <Select defaultValue="+260">
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+260">+260</SelectItem>
                    <SelectItem value="+1">+1</SelectItem>
                    <SelectItem value="+44">+44</SelectItem>
                    <SelectItem value="+91">+91</SelectItem>
                  </SelectContent>
                </Select>
                <Input 
                  id="mobile"
                  value={formData.mobileNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, mobileNumber: e.target.value }))}
                  placeholder="Mobile number"
                  className="flex-1"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="customer@example.com"
              />
            </div>

            {/* Service */}
            <div>
              <Label htmlFor="service">Service</Label>
              <Select value={formData.service} onValueChange={(value) => setFormData(prev => ({ ...prev, service: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Service</SelectItem>
                  <SelectItem value="oil-change">Oil Change</SelectItem>
                  <SelectItem value="brake-service">Brake Service</SelectItem>
                  <SelectItem value="tire-service">Tire Service</SelectItem>
                  <SelectItem value="engine-repair">Engine Repair</SelectItem>
                  <SelectItem value="ac-service">AC Service</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Service Advisor */}
            <div>
              <Label htmlFor="advisor">Service Advisor</Label>
              <Select value={formData.serviceAdvisor} onValueChange={(value) => setFormData(prev => ({ ...prev, serviceAdvisor: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select advisor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john-doe">John Doe</SelectItem>
                  <SelectItem value="jane-smith">Jane Smith</SelectItem>
                  <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
                  <SelectItem value="sarah-wilson">Sarah Wilson</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button type="submit" variant="default" className="flex-1">
              Book Appointment
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;