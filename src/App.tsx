import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import SellProducts from "./pages/SellProducts";
import SellProductsList from "./pages/SellProductsList";
import SellProductsCreate from "./pages/SellProductsCreate";
import JobCards from "./pages/JobCards";
import ServiceTickets from "./pages/ServiceTickets";
import CalendarView from "./pages/CalendarView";
import Invoices from "./pages/Invoices";
import Stock from "./pages/Stock";
import PartsOrder from "./pages/parts/PartsOrder";
import Reminders from "./pages/Reminders";
import UploadStock from "./pages/UploadStock";
import Reports from "./pages/Reports";
import Transactions from "./pages/Transactions";
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
            
            {/* Sell Products Routes */}
            <Route path="/sell-products" element={<SellProductsList />} />
            <Route path="/sell-products/create" element={<SellProductsCreate />} />
            
            {/* Main Routes */}
            <Route path="/job-cards" element={<JobCards />} />
            <Route path="/service-tickets" element={<ServiceTickets />} />
            <Route path="/appointments" element={<CalendarView />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/reminders" element={<Reminders />} />
            <Route path="/upload-stock" element={<UploadStock />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/transactions" element={<Transactions />} />
            
            {/* Parts Sub-routes */}
            <Route path="/parts" element={<Stock />} />
            <Route path="/parts/order" element={<PartsOrder />} />
            <Route path="/parts/inward" element={<div className="p-6"><h1 className="text-2xl font-bold">Parts Inward</h1><p className="text-muted-foreground">Parts inward page coming soon...</p></div>} />
            <Route path="/parts/issue" element={<div className="p-6"><h1 className="text-2xl font-bold">Parts Issue</h1><p className="text-muted-foreground">Parts issue page coming soon...</p></div>} />
            <Route path="/parts/stock" element={<Stock />} />
            <Route path="/parts/transfer" element={<div className="p-6"><h1 className="text-2xl font-bold">Stock Transfer</h1><p className="text-muted-foreground">Stock transfer page coming soon...</p></div>} />
            
            {/* Remaining placeholder routes */}
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
