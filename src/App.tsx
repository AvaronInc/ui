
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import Index from "./pages/Index";
import RMM from "./pages/RMM";
import IPAM from "./pages/IPAM";
import Tickets from "./pages/Tickets";
import Projects from "./pages/Projects";
import Identity from "./pages/Identity";
import Storage from "./pages/Storage";
import Security from "./pages/Security";
import WorkforceEMS from "./pages/WorkforceEMS";
import Topology from "./pages/Topology";
import Nest from "./pages/Nest";
import AdminSettings from "./pages/AdminSettings";
import SDMS from "./pages/SDMS";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/rmm" element={<RMM />} />
              <Route path="/ipam" element={<IPAM />} />
              <Route path="/tickets" element={<Tickets />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/identity" element={<Identity />} />
              <Route path="/topology" element={<Topology />} />
              <Route path="/nest" element={<Nest />} />
              <Route path="/storage" element={<Storage />} />
              <Route path="/security" element={<Security />} />
              <Route path="/workforce" element={<WorkforceEMS />} />
              <Route path="/settings" element={<AdminSettings />} />
              <Route path="/sdms" element={<SDMS />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
