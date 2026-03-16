import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Search, GripVertical, ExternalLink, Trash2, Edit } from "lucide-react";

type Status = "Saved" | "Applied" | "Interview" | "Offer" | "Closed";

interface Application {
  id: string;
  company: string;
  role: string;
  status: Status;
  link: string;
  date: string;
}

const initialApps: Application[] = [
  { id: "1", company: "Google", role: "Frontend Engineer", status: "Interview", link: "https://careers.google.com", date: "2026-03-12" },
  { id: "2", company: "Stripe", role: "Full Stack Dev", status: "Applied", link: "https://stripe.com/jobs", date: "2026-03-10" },
  { id: "3", company: "Notion", role: "React Developer", status: "Saved", link: "https://notion.so/careers", date: "2026-03-09" },
  { id: "4", company: "Figma", role: "UI Engineer", status: "Offer", link: "https://figma.com/careers", date: "2026-03-07" },
  { id: "5", company: "Vercel", role: "Software Engineer", status: "Applied", link: "https://vercel.com/careers", date: "2026-03-05" },
  { id: "6", company: "Linear", role: "Product Engineer", status: "Saved", link: "https://linear.app/careers", date: "2026-03-04" },
  { id: "7", company: "Slack", role: "Backend Engineer", status: "Applied", link: "https://slack.com/careers", date: "2026-03-03" },
  { id: "8", company: "Shopify", role: "Full Stack Dev", status: "Closed", link: "https://shopify.com/careers", date: "2026-02-28" },
];

const statuses: Status[] = ["Saved", "Applied", "Interview", "Offer", "Closed"];

function statusStyle(s: Status) {
  switch (s) {
    case "Saved": return "bg-muted text-muted-foreground";
    case "Applied": return "bg-primary/10 text-primary";
    case "Interview": return "bg-info/10 text-info";
    case "Offer": return "bg-success/10 text-success";
    case "Closed": return "bg-muted text-muted-foreground";
  }
}

export default function ApplicationTracker() {
  const [apps, setApps] = useState(initialApps);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"kanban" | "list">("kanban");
  const [addOpen, setAddOpen] = useState(false);
  const [newApp, setNewApp] = useState({ company: "", role: "", link: "", status: "Saved" as Status });

  const filtered = apps.filter(
    (a) =>
      a.company.toLowerCase().includes(search.toLowerCase()) ||
      a.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!newApp.company || !newApp.role) return;
    setApps([
      { ...newApp, id: Date.now().toString(), date: new Date().toISOString().slice(0, 10) },
      ...apps,
    ]);
    setNewApp({ company: "", role: "", link: "", status: "Saved" });
    setAddOpen(false);
  };

  const handleStatusChange = (id: string, status: Status) => {
    setApps(apps.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const handleDelete = (id: string) => {
    setApps(apps.filter((a) => a.id !== id));
  };

  const counts = statuses.reduce((acc, s) => {
    acc[s] = filtered.filter((a) => a.status === s).length;
    return acc;
  }, {} as Record<Status, number>);

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Application Tracker</h1>
          <p className="text-muted-foreground">Track and manage all your job applications</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-[200px]"
            />
          </div>
          <div className="flex border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setView("kanban")}
              className={`px-3 py-2 text-xs font-medium ${view === "kanban" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
            >
              Board
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-3 py-2 text-xs font-medium ${view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
            >
              List
            </button>
          </div>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="w-4 h-4" /> Add</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Application</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div className="space-y-2">
                  <Label>Company *</Label>
                  <Input value={newApp.company} onChange={(e) => setNewApp({ ...newApp, company: e.target.value })} placeholder="Google" />
                </div>
                <div className="space-y-2">
                  <Label>Job Title *</Label>
                  <Input value={newApp.role} onChange={(e) => setNewApp({ ...newApp, role: e.target.value })} placeholder="Frontend Engineer" />
                </div>
                <div className="space-y-2">
                  <Label>Link</Label>
                  <Input value={newApp.link} onChange={(e) => setNewApp({ ...newApp, link: e.target.value })} placeholder="https://..." />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={newApp.status} onValueChange={(v) => setNewApp({ ...newApp, status: v as Status })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full" onClick={handleAdd}>Add Application</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-3">
        {statuses.map((s) => (
          <div key={s} className={`px-3 py-1.5 rounded-full text-xs font-medium ${statusStyle(s)}`}>
            {s}: {counts[s]}
          </div>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <p className="text-lg font-medium text-foreground mb-2">No applications yet</p>
            <p className="text-muted-foreground mb-4">Start tracking your job applications</p>
            <Button onClick={() => setAddOpen(true)}><Plus className="w-4 h-4" /> Add your first application</Button>
          </CardContent>
        </Card>
      ) : view === "kanban" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {statuses.map((status) => (
            <div key={status} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">{status}</h3>
                <span className="text-xs text-muted-foreground">{counts[status]}</span>
              </div>
              <div className="space-y-2 min-h-[100px]">
                {filtered.filter((a) => a.status === status).map((app) => (
                  <Card key={app.id} className="group">
                    <CardContent className="p-3 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-foreground leading-tight">{app.role}</p>
                          <p className="text-xs text-muted-foreground">{app.company}</p>
                        </div>
                        <GripVertical className="w-3.5 h-3.5 text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="flex items-center gap-1">
                        <Select value={app.status} onValueChange={(v) => handleStatusChange(app.id, v as Status)}>
                          <SelectTrigger className="h-6 text-[10px] px-2 w-auto border-0 bg-transparent">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <div className="ml-auto flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          {app.link && (
                            <a href={app.link} target="_blank" rel="noopener" className="p-1 text-muted-foreground hover:text-foreground">
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          <button onClick={() => handleDelete(app.id)} className="p-1 text-muted-foreground hover:text-destructive">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-xs font-medium text-muted-foreground p-3">Company</th>
                    <th className="text-left text-xs font-medium text-muted-foreground p-3">Role</th>
                    <th className="text-left text-xs font-medium text-muted-foreground p-3">Status</th>
                    <th className="text-left text-xs font-medium text-muted-foreground p-3">Date</th>
                    <th className="text-right text-xs font-medium text-muted-foreground p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((app) => (
                    <tr key={app.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                      <td className="p-3 text-sm font-medium text-foreground">{app.company}</td>
                      <td className="p-3 text-sm text-foreground">{app.role}</td>
                      <td className="p-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusStyle(app.status)}`}>{app.status}</span>
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">{app.date}</td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {app.link && (
                            <a href={app.link} target="_blank" rel="noopener" className="p-1.5 text-muted-foreground hover:text-foreground">
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <button onClick={() => handleDelete(app.id)} className="p-1.5 text-muted-foreground hover:text-destructive">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
