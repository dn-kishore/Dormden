import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import { ThemeProvider } from "next-themes";
=======
import { ThemeProvider } from "@/contexts/ThemeContext";
>>>>>>> 934061e (updated project)
import Index from "./pages/Index";
import SearchPage from "./pages/SearchPage";
import ListingDetails from "./pages/ListingDetails";
import AdminPage from "./pages/AdminPage";
import ManageListings from "./pages/ManageListings";
<<<<<<< HEAD
=======
import ManagerDashboard from "./pages/ManagerDashboard";
>>>>>>> 934061e (updated project)
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
<<<<<<< HEAD
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
=======
    <ThemeProvider>
>>>>>>> 934061e (updated project)
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
<<<<<<< HEAD
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/listing/:id" element={<ListingDetails />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/manage" element={<ManageListings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
=======
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/listing/:id" element={<ListingDetails />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/manage" element={<ManageListings />} />
            <Route path="/manager" element={<ManagerDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
>>>>>>> 934061e (updated project)
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
