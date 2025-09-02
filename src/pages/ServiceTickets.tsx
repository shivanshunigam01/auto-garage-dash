import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Car, Search, Eye, Plus } from 'lucide-react';

const ServiceTickets = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Vehicle Details
    registrationNo: '',
    odometerReading: '25',
    vinNumber: '',
    engineNo: '',
    make: '',
    model: '',
    year: '',
    variant: '',
    
    // Service Details
    serviceType: '',
    vehicleColor: 'WHITE',
    fuelType: 'PETROL',
    serviceAdvisor: 'Cs.17@autorox.coo',
    estimatedDeliveryDate: ''
  });

  const steps = [
    { id: 1, title: 'VEHICLE DETAILS', icon: Car, color: 'text-success' },
    { id: 2, title: 'CUSTOMER DETAILS', icon: User, color: 'text-brand-blue' },
    { id: 3, title: 'CUSTOMER CONCERNS', icon: Calendar, color: 'text-muted-foreground' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Service Tickets</h1>
          <p className="text-muted-foreground">Create new service tickets for customer vehicles</p>
        </div>
        <Button variant="ghost" className="text-muted-foreground">
          ← Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Steps */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">TICKET</CardTitle>
              <div className="flex gap-2">
                <Button size="sm" variant="default">Ticket</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step.id 
                      ? 'bg-success text-success-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {step.id}
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${currentStep >= step.id ? step.color : 'text-muted-foreground'}`}>
                      {step.title}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-brand-blue">VEHICLE DETAILS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Primary Details Section */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-foreground">Primary Details</h3>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">🛡️</Button>
                    <Button size="sm" variant="outline">🔄</Button>
                    <Button size="sm" variant="outline">😊</Button>
                    <Button size="sm" variant="outline">📷</Button>
                    <Button size="sm" variant="outline">🔔</Button>
                    <Button size="sm" variant="outline">📋</Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                  <div>
                    <Label htmlFor="regNo" className="text-sm font-medium">Registration No *</Label>
                    <Input
                      id="regNo"
                      placeholder="Enter Registration No."
                      value={formData.registrationNo}
                      onChange={(e) => handleInputChange('registrationNo', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="odometer" className="text-sm font-medium">Odometer In *</Label>
                    <Input
                      id="odometer"
                      placeholder="Enter Odometer Reading"
                      value={formData.odometerReading}
                      onChange={(e) => handleInputChange('odometerReading', e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="text-2xl font-bold text-foreground">25</div>
                  </div>
                  <div className="flex items-center justify-center">
                    <Eye className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <Label htmlFor="vin" className="text-sm font-medium">Enter VIN Number</Label>
                    <Input
                      id="vin"
                      placeholder="Enter VIN Number"
                      value={formData.vinNumber}
                      onChange={(e) => handleInputChange('vinNumber', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Engine No.</Label>
                    <Input
                      placeholder="Enter Engine No."
                      value={formData.engineNo}
                      onChange={(e) => handleInputChange('engineNo', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Model Details Section */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-foreground">Model Details</h3>
                  <Button size="sm" variant="brand">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Make *</Label>
                    <Select value={formData.make} onValueChange={(value) => handleInputChange('make', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="(e.g Maruti, Honda)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="maruti">Maruti</SelectItem>
                        <SelectItem value="honda">Honda</SelectItem>
                        <SelectItem value="toyota">Toyota</SelectItem>
                        <SelectItem value="hyundai">Hyundai</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Model *</Label>
                    <Select value={formData.model} onValueChange={(value) => handleInputChange('model', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="(e.g Civic, Seltos)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="civic">Civic</SelectItem>
                        <SelectItem value="seltos">Seltos</SelectItem>
                        <SelectItem value="camry">Camry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Year *</Label>
                    <Select value={formData.year} onValueChange={(value) => handleInputChange('year', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Enter Year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Variant *</Label>
                    <Select value={formData.variant} onValueChange={(value) => handleInputChange('variant', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="(e.g ZX, VX)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zx">ZX</SelectItem>
                        <SelectItem value="vx">VX</SelectItem>
                        <SelectItem value="lx">LX</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Service Details Section */}
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-4">Service / Fuel / Estimated Delivery / Additional info</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <Label className="text-sm font-medium">Service Type</Label>
                    <Select value={formData.serviceType} onValueChange={(value) => handleInputChange('serviceType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Service Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Service</SelectItem>
                        <SelectItem value="oil">Oil Change</SelectItem>
                        <SelectItem value="brake">Brake Service</SelectItem>
                        <SelectItem value="ac">AC Service</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Vehicle Colour</Label>
                    <div className="p-2 border rounded bg-muted">
                      <span className="text-sm text-foreground">{formData.vehicleColor}</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Fuel Type</Label>
                    <Select value={formData.fuelType} onValueChange={(value) => handleInputChange('fuelType', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PETROL">PETROL</SelectItem>
                        <SelectItem value="DIESEL">DIESEL</SelectItem>
                        <SelectItem value="CNG">CNG</SelectItem>
                        <SelectItem value="ELECTRIC">ELECTRIC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Service Advisor</Label>
                    <Select value={formData.serviceAdvisor} onValueChange={(value) => handleInputChange('serviceAdvisor', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cs.17@autorox.coo">Cs.17@autorox.coo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Estimated Delivery Date *</Label>
                    <div className="relative">
                      <Input
                        placeholder="Select Date"
                        value={formData.estimatedDeliveryDate}
                        onChange={(e) => handleInputChange('estimatedDeliveryDate', e.target.value)}
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4">
                <Button variant="ghost" onClick={prevStep} disabled={currentStep === 1}>
                  Previous
                </Button>
                <Button variant="brand" onClick={nextStep} disabled={currentStep === 3}>
                  Next Step
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ServiceTickets;