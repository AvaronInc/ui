import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/auth";
import { AlertsProvider } from "./context/AlertsContext";
import { CLIProvider } from "./providers/CLIProvider";
import ProtectedRoute from "./components/auth/ProtectedRoute";

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
          <CLIProvider>
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
                  <Route path="/authenticator" element={<ProtectedRoute><Authenticator /></ProtectedRoute>} />
                  <Route path="/topology" element={<ProtectedRoute><Topology /></ProtectedRoute>} />
                  <Route path="/nest" element={<ProtectedRoute><Nest /></ProtectedRoute>} />
                  <Route path="/aim" element={<ProtectedRoute><AIM /></ProtectedRoute>} />
                  <Route path="/quantum-encryption" element={<ProtectedRoute><QuantumEncryption /></ProtectedRoute>} />
                  <Route path="/storage" element={<ProtectedRoute><Storage /></ProtectedRoute>} />
                  <Route path="/security" element={<ProtectedRoute><Security /></ProtectedRoute>} />
                  <Route path="/workforce" element={<ProtectedRoute><WorkforceEMS /></ProtectedRoute>} />
                  <Route path="/messaging" element={<ProtectedRoute><Messaging /></ProtectedRoute>} />
                  <Route path="/teams-chat" element={<ProtectedRoute><TeamsChat /></ProtectedRoute>} />
                  <Route path="/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
                  <Route path="/sdms" element={<ProtectedRoute><SDMS /></ProtectedRoute>} />
                  <Route path="/email-security" element={<ProtectedRoute><EmailSecurity /></ProtectedRoute>} />
                  <Route path="/asset-management" element={<ProtectedRoute><AssetManagement /></ProtectedRoute>} />
                  <Route path="/automation" element={<ProtectedRoute><Automation /></ProtectedRoute>} />
                  <Route path="/sdwan" element={<ProtectedRoute><SDWAN /></ProtectedRoute>} />
                  <Route path="/sdn" element={<ProtectedRoute><SDN /></ProtectedRoute>} />
                  <Route path="/dns-management" element={<ProtectedRoute><DNSManagement /></ProtectedRoute>} />
                  <Route path="/contacts" element={<ProtectedRoute><Contacts /></ProtectedRoute>} />
                  <Route path="/integrations" element={<ProtectedRoute><Integrations /></ProtectedRoute>} />
                  <Route path="/billing" element={<ProtectedRoute adminOnly><Billing /></ProtectedRoute>} />
                  <Route path="/license-compliance" element={<ProtectedRoute adminOnly><LicenseCompliance /></ProtectedRoute>} />
                  <Route path="/containers" element={<ProtectedRoute><Containers /></ProtectedRoute>} />
                  <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
                  <Route path="/system-services" element={<ProtectedRoute><SystemServices /></ProtectedRoute>} />
                  <Route path="/system-configuration" element={<ProtectedRoute adminOnly><SystemConfiguration /></ProtectedRoute>} />
                  <Route path="/change-management" element={<ProtectedRoute><ChangeManagement /></ProtectedRoute>} />
                  <Route path="/scheduling" element={<ProtectedRoute><Scheduling /></ProtectedRoute>} />
                  <Route path="/firewall" element={<ProtectedRoute><Firewall /></ProtectedRoute>} />
                  <Route path="/honeypot" element={<ProtectedRoute><Honeypot /></ProtectedRoute>} />
                  <Route path="/security-testing" element={<ProtectedRoute><SecurityTesting /></ProtectedRoute>} />
                  <Route path="/logging-audit" element={<ProtectedRoute><LoggingAudit /></ProtectedRoute>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AnimatePresence>
            </BrowserRouter>
          </CLIProvider>
        </AlertsProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
