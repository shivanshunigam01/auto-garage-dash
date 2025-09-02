import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  ShoppingCart, 
  Package, 
  Wrench, 
  Bell, 
  Upload, 
  BarChart3, 
  CreditCard, 
  Users, 
  Receipt, 
  Gift, 
  Clock, 
  Settings,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Calendar, label: 'Book Appointment', path: '/appointments' },
  { icon: FileText, label: 'Job Cards', path: '/job-cards' },
  { icon: ShoppingCart, label: 'Sell Products', path: '/sell-products' },
  { icon: Package, label: 'Stock', path: '/stock' },
  { 
    icon: Wrench, 
    label: 'Parts', 
    path: '/parts',
    hasSubmenu: true,
    submenuItems: [
      { label: 'All Parts', path: '/parts/all' },
      { label: 'Categories', path: '/parts/categories' },
    ]
  },
  { icon: Bell, label: 'Reminders', path: '/reminders' },
  { icon: Upload, label: 'Upload Stock', path: '/upload-stock' },
  { icon: BarChart3, label: 'Reports', path: '/reports' },
  { icon: CreditCard, label: 'Transactions', path: '/transactions' },
  { 
    icon: Users, 
    label: 'Customers', 
    path: '/customers',
    hasSubmenu: true,
    submenuItems: [
      { label: 'All Customers', path: '/customers/all' },
      { label: 'Add Customer', path: '/customers/add' },
    ]
  },
  { icon: Receipt, label: 'Credit & Debit Note', path: '/credit-debit' },
  { 
    icon: Gift, 
    label: 'Loyalty Scheme', 
    path: '/loyalty',
    hasSubmenu: true,
    submenuItems: [
      { label: 'Schemes', path: '/loyalty/schemes' },
      { label: 'Points', path: '/loyalty/points' },
    ]
  },
  { 
    icon: Clock, 
    label: 'Time Tracker', 
    path: '/time-tracker',
    hasSubmenu: true,
    submenuItems: [
      { label: 'Current Tasks', path: '/time-tracker/current' },
      { label: 'History', path: '/time-tracker/history' },
    ]
  },
  { 
    icon: Settings, 
    label: 'Configure', 
    path: '/configure',
    hasSubmenu: true,
    submenuItems: [
      { label: 'General', path: '/configure/general' },
      { label: 'Users', path: '/configure/users' },
      { label: 'Permissions', path: '/configure/permissions' },
    ]
  },
];

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  return (
    <div className={cn(
      "bg-brand-blue text-primary-foreground transition-all duration-300 flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Logo */}
      <div className="p-4 border-b border-brand-blue-light">
        {!isCollapsed ? (
          <div>
            <h1 className="text-xl font-bold">autorox</h1>
            <p className="text-xs text-primary-foreground/80">SMART GARAGE</p>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-8 h-8 bg-primary-foreground text-brand-blue rounded flex items-center justify-center font-bold text-sm">
              A
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-2">
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-3 py-2.5 rounded-lg transition-colors group",
                    "hover:bg-brand-blue-light",
                    isActive && "bg-primary-foreground text-brand-blue font-medium"
                  )
                }
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <>
                    <span className="ml-3 text-sm">{item.label}</span>
                    {item.hasSubmenu && (
                      <ChevronDown className="w-4 h-4 ml-auto" />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User info at bottom */}
      <div className="p-4 border-t border-brand-blue-light">
        {!isCollapsed ? (
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-foreground text-brand-blue rounded-full flex items-center justify-center text-xs font-medium">
              CS
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">cs.17@autorox.coo</p>
              <p className="text-xs text-primary-foreground/70">Admin</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 bg-primary-foreground text-brand-blue rounded-full flex items-center justify-center text-xs font-medium">
              CS
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;