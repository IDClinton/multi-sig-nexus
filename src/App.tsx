import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import MyWallets from "./pages/MyWallets";
import Settings from "./pages/Settings";
import WalletDetail from "./pages/WalletDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={
            <div className="min-h-screen bg-background">
              <Header />
              <Dashboard />
            </div>
          } />
          <Route path="/my-wallets" element={
            <div className="min-h-screen bg-background">
              <Header />
              <MyWallets />
            </div>
          } />
          <Route path="/settings" element={
            <div className="min-h-screen bg-background">
              <Header />
              <Settings />
            </div>
          } />
          <Route path="/wallet/:id" element={
            <div className="min-h-screen bg-background">
              <Header />
              <WalletDetail />
            </div>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
