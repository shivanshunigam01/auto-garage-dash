import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import SellProducts from "./pages/SellProducts";
import JobCards from "./pages/JobCards";
import ServiceTickets from "./pages/ServiceTickets";
import CalendarView from "./pages/CalendarView";
import Invoices from "./pages/Invoices";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sell-products" element={<SellProducts />} />
            <Route path="/job-cards" element={<JobCards />} />
            <Route path="/service-tickets" element={<ServiceTickets />} />
            <Route path="/appointments" element={<CalendarView />} />
            <Route path="/invoices" element={<Invoices />} />
            
            {/* Placeholder routes for other sidebar items */}
            <Route path="/stock" element={<div className="p-6"><h1 className="text-2xl font-bold">Stock Management</h1><p className="text-muted-foreground">Stock management page coming soon...</p></div>} />
            <Route path="/parts" element={<div className="p-6"><h1 className="text-2xl font-bold">Parts</h1><p className="text-muted-foreground">Parts management page coming soon...</p></div>} />
            <Route path="/reminders" element={<div className="p-6"><h1 className="text-2xl font-bold">Reminders</h1><p className="text-muted-foreground">Reminders page coming soon...</p></div>} />
            <Route path="/upload-stock" element={<div className="p-6"><h1 className="text-2xl font-bold">Upload Stock</h1><p className="text-muted-foreground">Upload stock page coming soon...</p></div>} />
            <Route path="/reports" element={<div className="p-6"><h1 className="text-2xl font-bold">Reports</h1><p className="text-muted-foreground">Reports page coming soon...</p></div>} />
            <Route path="/transactions" element={<div className="p-6"><h1 className="text-2xl font-bold">Transactions</h1><p className="text-muted-foreground">Transactions page coming soon...</p></div>} />
            <Route path="/customers" element={<div className="p-6"><h1 className="text-2xl font-bold">Customers</h1><p className="text-muted-foreground">Customer management page coming soon...</p></div>} />
            <Route path="/credit-debit" element={<div className="p-6"><h1 className="text-2xl font-bold">Credit & Debit Notes</h1><p className="text-muted-foreground">Credit & debit notes page coming soon...</p></div>} />
            <Route path="/loyalty" element={<div className="p-6"><h1 className="text-2xl font-bold">Loyalty Scheme</h1><p className="text-muted-foreground">Loyalty scheme page coming soon...</p></div>} />
            <Route path="/time-tracker" element={<div className="p-6"><h1 className="text-2xl font-bold">Time Tracker</h1><p className="text-muted-foreground">Time tracker page coming soon...</p></div>} />
            <Route path="/configure" element={<div className="p-6"><h1 className="text-2xl font-bold">Configure</h1><p className="text-muted-foreground">Configuration page coming soon...</p></div>} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
