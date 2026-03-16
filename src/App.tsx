import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/layout/AppLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Start from "./pages/Start";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ApplicationTracker from "./pages/ApplicationTracker";
import AIResumeStudio from "./pages/AIResumeStudio";
import ResumeGenerator from "./pages/ResumeGenerator";
import ATSScanner from "./pages/ATSScanner";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import InterviewPractice from "./pages/InterviewPractice";
import JobRecommendations from "./pages/JobRecommendations";
import Pricing from "./pages/Pricing";
import Settings from "./pages/Settings";
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
            {/* Public routes */}
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

            {/* Protected routes with layout */}
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/start" element={<Start />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/application-tracker" element={<ApplicationTracker />} />
              <Route path="/ai-resume-studio" element={<AIResumeStudio />} />
              <Route path="/resume-generator" element={<ResumeGenerator />} />
              <Route path="/job-scan" element={<ATSScanner />} />
              <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
              <Route path="/interview-practice" element={<InterviewPractice />} />
              <Route path="/job-recommendations" element={<JobRecommendations />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
