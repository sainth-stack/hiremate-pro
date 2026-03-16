import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard, User, Kanban, FileText, ScanSearch, FileBarChart,
  Mic, CreditCard, Settings, LogOut, Sparkles, Menu, X, Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Applications", icon: Kanban, path: "/application-tracker" },
  { label: "AI Resume Studio", icon: Sparkles, path: "/ai-resume-studio" },
  { label: "Resume Generator", icon: FileText, path: "/resume-generator" },
  { label: "ATS Scanner", icon: ScanSearch, path: "/job-scan" },
  { label: "Resume Analyzer", icon: FileBarChart, path: "/resume-analyzer" },
  { label: "Interview Prep", icon: Mic, path: "/interview-practice" },
  { label: "Job Recommendations", icon: Briefcase, path: "/job-recommendations" },
  { label: "Profile", icon: User, path: "/profile" },
  { label: "Pricing", icon: CreditCard, path: "/pricing" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <div className="md:hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-border bg-card sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <Briefcase className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <span className="font-bold text-base">HireMate</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Drawer */}
      {open && (
        <div className="fixed inset-0 z-40 top-14 bg-background/95 backdrop-blur-sm">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors",
                    active ? "bg-primary/10 text-primary" : "text-foreground/70 hover:bg-accent"
                  )}
                >
                  <item.icon className="w-[18px] h-[18px]" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <div className="border-t border-border pt-3 mt-3">
              {user && <p className="px-3 text-sm text-muted-foreground mb-2">{user.email}</p>}
              <button
                onClick={() => { logout(); setOpen(false); }}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 w-full"
              >
                <LogOut className="w-[18px] h-[18px]" /> Logout
              </button>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
