import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard, Kanban,
  Mic, LogOut, Sparkles, ChevronLeft, ChevronRight, Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const mainNav = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Application Tracker", icon: Kanban, path: "/application-tracker" },
  { label: "AI Resume Studio", icon: Sparkles, path: "/ai-resume-studio" },
  { label: "Interview practice", icon: Mic, path: "/interview-practice" },
];

export default function AppSidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path: string) => {
    if (path === "/ai-resume-studio") {
      return ["/ai-resume-studio", "/resume-generator", "/job-scan", "/resume-analyzer"].some(
        p => location.pathname.startsWith(p)
      );
    }
    return location.pathname === path;
  };

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-200 h-screen sticky top-0",
        collapsed ? "w-[68px]" : "w-[240px]"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 h-16 border-b border-sidebar-border shrink-0">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
          <Briefcase className="w-4 h-4 text-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="font-bold text-lg text-sidebar-foreground tracking-tight">HireMate</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 overflow-y-auto scrollbar-thin">
        {!collapsed && (
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
            Pages
          </p>
        )}
        <div className="space-y-1">
          {mainNav.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className="w-[18px] h-[18px] shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User + collapse */}
      <div className="border-t border-sidebar-border p-3 space-y-2 shrink-0">
        {!collapsed && user && (
          <div className="flex items-center gap-2.5 px-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>
        )}
        {collapsed && user && (
          <div className="flex justify-center mb-1">
            <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary">
              {user.name.charAt(0)}
            </div>
          </div>
        )}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={logout}
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground ml-auto"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </aside>
  );
}
