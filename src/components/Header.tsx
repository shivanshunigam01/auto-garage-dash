import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Menu, Search, Globe, User } from 'lucide-react';

interface HeaderProps {
  onSidebarToggle: () => void;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ onSidebarToggle, title }) => {
  return (
    <header className="bg-background border-b border-border h-16 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onSidebarToggle}
          className="lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        {title && (
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search..."
            className="pl-10 w-64"
          />
        </div>

        {/* Company Info */}
        <div className="hidden lg:flex items-center space-x-4 text-sm text-muted-foreground">
          <span>ASHGAR AUTOMOBILE TEST, JEDDAH</span>
          <div className="flex items-center space-x-1">
            <Globe className="w-4 h-4" />
            <span>cs.17@autorox.coo</span>
          </div>
        </div>

        {/* User Menu */}
        <Button variant="ghost" size="sm">
          <User className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;