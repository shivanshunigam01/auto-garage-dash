import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import garageBackground from '@/assets/garage-background.jpg';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberPassword: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      toast({
        title: "Error",
        description: "Please enter both username and password",
        variant: "destructive"
      });
      return;
    }

    // Simulate login
    toast({
      title: "Login Successful",
      description: "Welcome to Autorox Smart Garage"
    });
    
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Background illustration */}
      <div 
        className="hidden lg:flex lg:w-2/3 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${garageBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/10 to-transparent"></div>
        <div className="absolute bottom-8 left-8 text-primary-foreground">
          <h1 className="text-4xl font-bold mb-2">autorox</h1>
          <p className="text-xl">SMART GARAGE</p>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-foreground/70">
          All Content Copyright © 2025, Smart Auto Systems Private Limited. All rights reserved
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/3 flex items-center justify-center bg-background p-8">
        <div className="w-full max-w-md">
          {/* Success message bar */}
          <div className="bg-success/10 border border-success/20 text-success-foreground p-3 rounded-md mb-6 text-center text-sm">
            You've logged out successfully!
          </div>

          <div className="bg-card p-8 rounded-lg shadow-lg border">
            <h2 className="text-2xl font-bold text-center mb-8 text-foreground">Sign In</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="username" className="text-sm font-medium text-foreground">
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="cs.17@autorox.coo"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">
                    Password
                  </Label>
                  <button
                    type="button"
                    className="text-sm text-brand-blue hover:text-brand-blue-dark"
                    onClick={() => toast({ title: "Forgot Password", description: "Password reset functionality would be implemented here" })}
                  >
                    I Forgot
                  </button>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="mt-1"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={formData.rememberPassword}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, rememberPassword: checked as boolean }))
                  }
                />
                <Label htmlFor="remember" className="text-sm text-muted-foreground">
                  Remember Password
                </Label>
              </div>

              <Button 
                type="submit" 
                variant="success"
                className="w-full"
              >
                Continue
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;