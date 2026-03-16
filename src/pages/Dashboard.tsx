import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Briefcase, TrendingUp, Building2, BarChart3, ArrowRight,
  Flame, Lightbulb, Clock, Target
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

// Mock data
const stats = [
  { label: "Applied", value: 24, icon: Briefcase, change: "+3 this week" },
  { label: "Saved", value: 12, icon: Clock, change: "2 new" },
  { label: "Companies", value: 18, icon: Building2, change: "+5" },
  { label: "Response Rate", value: "33%", icon: TrendingUp, change: "↑ 5%" },
];

const funnel = [
  { stage: "Saved", count: 12, color: "bg-muted-foreground" },
  { stage: "Applied", count: 24, color: "bg-primary" },
  { stage: "Interview", count: 8, color: "bg-info" },
  { stage: "Offer", count: 3, color: "bg-success" },
  { stage: "Closed", count: 2, color: "bg-muted-foreground/50" },
];

const recentApps = [
  { company: "Google", role: "Frontend Engineer", status: "Interview", date: "Mar 12" },
  { company: "Stripe", role: "Full Stack Dev", status: "Applied", date: "Mar 10" },
  { company: "Notion", role: "React Developer", status: "Saved", date: "Mar 9" },
  { company: "Figma", role: "UI Engineer", status: "Offer", date: "Mar 7" },
  { company: "Vercel", role: "Software Engineer", status: "Applied", date: "Mar 5" },
];

const savedJobs = [
  { company: "Slack", role: "Backend Engineer", age: "Fresh", daysAgo: 1 },
  { company: "Linear", role: "Product Engineer", age: "Fresh", daysAgo: 2 },
  { company: "Raycast", role: "Desktop Dev", age: "Aging", daysAgo: 8 },
  { company: "Dropbox", role: "SRE", age: "Stale", daysAgo: 21 },
];

const companyTracker = [
  { company: "Google", visits: 12, applied: true, signal: "High interest" },
  { company: "Stripe", visits: 8, applied: true, signal: "Active" },
  { company: "Notion", visits: 3, applied: false, signal: "Going cold" },
  { company: "Meta", visits: 1, applied: false, signal: "Cold" },
];

const insights = [
  { icon: Flame, title: "5-day streak!", desc: "You've applied every day this week. Keep it going!" },
  { icon: Target, title: "High conversion", desc: "33% interview rate is above average. Focus on tailored resumes." },
  { icon: Lightbulb, title: "2 stale jobs", desc: "You saved 2 jobs over 2 weeks ago. Apply or remove them." },
];

function generateHeatmapData() {
  const data: { date: string; count: number }[] = [];
  const today = new Date();
  for (let i = 182; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    data.push({
      date: d.toISOString().slice(0, 10),
      count: Math.random() > 0.6 ? Math.floor(Math.random() * 5) + 1 : 0,
    });
  }
  return data;
}

const heatmapData = generateHeatmapData();

function statusColor(s: string) {
  switch (s) {
    case "Interview": return "bg-info/10 text-info";
    case "Offer": return "bg-success/10 text-success";
    case "Applied": return "bg-primary/10 text-primary";
    case "Saved": return "bg-muted text-muted-foreground";
    case "Closed": return "bg-muted text-muted-foreground";
    default: return "bg-muted text-muted-foreground";
  }
}

function ageColor(a: string) {
  switch (a) {
    case "Fresh": return "bg-success/10 text-success";
    case "Aging": return "bg-warning/10 text-warning";
    case "Stale": return "bg-destructive/10 text-destructive";
    default: return "bg-muted text-muted-foreground";
  }
}

function signalColor(s: string) {
  switch (s) {
    case "High interest": return "text-success";
    case "Active": return "text-primary";
    case "Going cold": return "text-warning";
    case "Cold": return "text-muted-foreground";
    default: return "text-muted-foreground";
  }
}

export default function Dashboard() {
  const [range, setRange] = useState("30d");
  const { user } = useAuth();
  const healthScore = 72;

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Good morning, {user?.name?.split(" ")[0] || "there"} 👋</h1>
          <p className="text-muted-foreground">Here's your career overview</p>
        </div>
        <Select value={range} onValueChange={setRange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="14d">Last 14 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{s.label}</span>
                <s.icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Health Score + Funnel */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Career Health Score */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" /> Career Health Score
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center pb-6">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
                <circle
                  cx="60" cy="60" r="52" fill="none"
                  stroke={healthScore >= 70 ? "hsl(var(--success))" : healthScore >= 40 ? "hsl(var(--warning))" : "hsl(var(--destructive))"}
                  strokeWidth="10" strokeLinecap="round"
                  strokeDasharray={`${(healthScore / 100) * 327} 327`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-foreground">{healthScore}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3 text-center max-w-[240px]">
              Good progress! Tailor your resume for each role to push past 80.
            </p>
          </CardContent>
        </Card>

        {/* Application Funnel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Application Funnel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {funnel.map((f) => (
              <div key={f.stage} className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-20 shrink-0">{f.stage}</span>
                <div className="flex-1 bg-muted rounded-full h-6 relative overflow-hidden">
                  <div
                    className={`h-full rounded-full ${f.color} transition-all`}
                    style={{ width: `${Math.max((f.count / 24) * 100, 8)}%` }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                    {f.count}
                  </span>
                </div>
              </div>
            ))}
            <p className="text-xs text-muted-foreground mt-2">
              💡 33% of your applied jobs moved to interview — above average!
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Activity Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Activity Heatmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto scrollbar-thin">
            <div className="flex gap-[3px] min-w-[700px]">
              {Array.from({ length: 26 }, (_, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-[3px]">
                  {Array.from({ length: 7 }, (_, dayIdx) => {
                    const idx = weekIdx * 7 + dayIdx;
                    const item = heatmapData[idx];
                    if (!item) return <div key={dayIdx} className="w-3 h-3" />;
                    const intensity = item.count === 0 ? "bg-muted" :
                      item.count <= 1 ? "bg-primary/20" :
                      item.count <= 2 ? "bg-primary/40" :
                      item.count <= 3 ? "bg-primary/60" : "bg-primary";
                    return (
                      <div
                        key={dayIdx}
                        className={`w-3 h-3 rounded-sm ${intensity}`}
                        title={`${item.date}: ${item.count} applications`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
            <span>Less</span>
            <div className="w-3 h-3 rounded-sm bg-muted" />
            <div className="w-3 h-3 rounded-sm bg-primary/20" />
            <div className="w-3 h-3 rounded-sm bg-primary/40" />
            <div className="w-3 h-3 rounded-sm bg-primary/60" />
            <div className="w-3 h-3 rounded-sm bg-primary" />
            <span>More</span>
          </div>
        </CardContent>
      </Card>

      {/* Company Tracker + Recent Apps */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Company Interest Tracker */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Company Interest Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {companyTracker.map((c) => (
                <div key={c.company} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                      {c.company.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{c.company}</p>
                      <p className="text-xs text-muted-foreground">{c.visits} visits</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {c.applied && <Badge variant="secondary" className="text-xs">Applied</Badge>}
                    <span className={`text-xs font-medium ${signalColor(c.signal)}`}>{c.signal}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Applications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Recent Applications</CardTitle>
            <Link to="/application-tracker">
              <Button variant="ghost" size="sm" className="text-xs">
                View all <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentApps.map((a, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{a.role}</p>
                    <p className="text-xs text-muted-foreground">{a.company} · {a.date}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor(a.status)}`}>
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Saved Jobs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Saved Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-3">
            {savedJobs.map((j, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">{j.role}</p>
                  <p className="text-xs text-muted-foreground">{j.company} · {j.daysAgo}d ago</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${ageColor(j.age)}`}>
                  {j.age}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Smart Insights */}
      <div className="grid sm:grid-cols-3 gap-4">
        {insights.map((ins, i) => (
          <Card key={i} className="border-primary/10">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <ins.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{ins.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{ins.desc}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link to="/application-tracker">
          <Button size="lg">
            <Kanban className="w-4 h-4" /> Go to Applications
          </Button>
        </Link>
      </div>
    </div>
  );
}

function Kanban(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="6" height="14" x="2" y="5" rx="2"/><rect width="6" height="10" x="16" y="5" rx="2"/><rect width="6" height="16" x="9" y="3" rx="2"/>
    </svg>
  );
}
