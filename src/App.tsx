
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { AlertsProvider } from "./context/AlertsContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
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
import EmailSecurity from "./pages/EmailSecurity";
import AssetManagement from "./pages/AssetManagement";
import NotFound from "./pages/NotFound";
import Automation from "./pages/Automation";
import Auth from "./pages/Auth";
import SDWAN from "./pages/SDWAN";
import SDN from "./pages/SDN";
import Contacts from "./pages/Contacts";
import Integrations from "./pages/Integrations";
import Billing from "./pages/Billing";
import Containers from "./pages/Containers";
import Services from "./pages/Services";
import ChangeManagement from "./pages/ChangeManagement";
import Scheduling from "./pages/Scheduling";
import Firewall from "./pages/Firewall";
import Honeypot from "./pages/Honeypot";
import SecurityTesting from "./pages/SecurityTesting";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <AlertsProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
                <Route path="/rmm" element={<ProtectedRoute><RMM /></ProtectedRoute>} />
                <Route path="/ipam" element={<ProtectedRoute><IPAM /></ProtectedRoute>} />
                <Route path="/tickets" element={<ProtectedRoute><Tickets /></ProtectedRoute>} />
                <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
                <Route path="/identity" element={<ProtectedRoute><Identity /></ProtectedRoute>} />
                <Route path="/topology" element={<ProtectedRoute><Topology /></ProtectedRoute>} />
                <Route path="/nest" element={<ProtectedRoute><Nest /></ProtectedRoute>} />
                <Route path="/storage" element={<ProtectedRoute><Storage /></ProtectedRoute>} />
                <Route path="/security" element={<ProtectedRoute><Security /></ProtectedRoute>} />
                <Route path="/workforce" element={<ProtectedRoute><WorkforceEMS /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
                <Route path="/sdms" element={<ProtectedRoute><SDMS /></ProtectedRoute>} />
                <Route path="/email-security" element={<ProtectedRoute><EmailSecurity /></ProtectedRoute>} />
                <Route path="/asset-management" element={<ProtectedRoute><AssetManagement /></ProtectedRoute>} />
                <Route path="/automation" element={<ProtectedRoute><Automation /></ProtectedRoute>} />
                <Route path="/sdwan" element={<ProtectedRoute><SDWAN /></ProtectedRoute>} />
                <Route path="/sdn" element={<ProtectedRoute><SDN /></ProtectedRoute>} />
                <Route path="/contacts" element={<ProtectedRoute><Contacts /></ProtectedRoute>} />
                <Route path="/integrations" element={<ProtectedRoute><Integrations /></ProtectedRoute>} />
                <Route path="/billing" element={<ProtectedRoute adminOnly><Billing /></ProtectedRoute>} />
                <Route path="/containers" element={<ProtectedRoute><Containers /></ProtectedRoute>} />
                <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
                <Route path="/change-management" element={<ProtectedRoute><ChangeManagement /></ProtectedRoute>} />
                <Route path="/scheduling" element={<ProtectedRoute><Scheduling /></ProtectedRoute>} />
                <Route path="/firewall" element={<ProtectedRoute><Firewall /></ProtectedRoute>} />
                <Route path="/honeypot" element={<ProtectedRoute><Honeypot /></ProtectedRoute>} />
                <Route path="/security-testing" element={<ProtectedRoute><SecurityTesting /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </BrowserRouter>
        </AlertsProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
