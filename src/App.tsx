import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/layout/AppLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ApplicationTracker from "./pages/ApplicationTracker";
import AIResumeStudio from "./pages/AIResumeStudio";
import ResumeGenerator from "./pages/ResumeGenerator";
import ATSScanner from "./pages/ATSScanner";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import InterviewPractice from "./pages/InterviewPractice";
import ChromeExtension from "./pages/ChromeExtension";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/" replace />;
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/application-tracker" element={<ApplicationTracker />} />
              <Route path="/ai-resume-studio" element={<AIResumeStudio />} />
              <Route path="/resume-generator" element={<ResumeGenerator />} />
              <Route path="/job-scan" element={<ATSScanner />} />
              <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
              <Route path="/interview-practice" element={<InterviewPractice />} />
              <Route path="/chrome-extension" element={<ChromeExtension />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
