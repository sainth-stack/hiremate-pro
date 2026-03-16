import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sparkles, ShieldCheck, User, CheckCircle, AlertCircle,
  FileText, PenSquare, Star, Users, ChevronDown, ChevronUp,
  MapPin, Mail, Phone, Linkedin, Github, ExternalLink, RefreshCw, Edit,
  Briefcase, X, Chrome
} from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "autofill" | "keywords" | "profile";

interface AutofillSection {
  id: string;
  label: string;
  icon: React.ReactNode;
  iconBg: string;
  status: "filled" | "no-field" | "pending";
  count?: string;
  expanded: boolean;
}

const mockProfile = {
  initials: "SG",
  name: "Sainath Reddy Guraka",
  title: "Full Stack Developer",
  location: "Bangalore, India",
  email: "sainathreddyguraka@gmail.com",
  phone: "9676688586",
  linkedin: "https://www.linkedin.com/in/sainathreddyguraka",
  github: "https://github.com/sainathreddyguraka",
  education: {
    school: "Jawaharlal Nehru Technological University Pulivendula",
    degree: "B.Tech · Computer Science and Engineering",
    dates: "Aug 2019 — Apr 2023",
  },
  experience: {
    title: "Full Stack Developer",
    company: "Landmark Group",
    details: "Landmark Group · Bangalore, India · Jan 2025 — Present",
    bullets: [
      "Developed and enhanced features for Styli, a large-scale e-commerce platform used by millions of users, improving performance, UI responsiveness, and stability.",
      "Built a multi-agent GenAI analytics system generating personalized product recommendations and insights.",
    ],
  },
  skills: [
    "JavaScript", "TypeScript", "Python", "SQL", "React.js", "React Native",
    "Next.js", "AngularJS", "Material UI", "Bootstrap", "Tailwind CSS",
    "Node.js", "Express.js", "FastAPI", "Cypress", "LangChain", "LangGraph",
    "OpenAI API", "Chroma", "Qdrant", "AWS", "Docker", "Kubernetes",
    "Nginx", "CI/CD Pipelines", "Leadership", "Communication",
  ],
  languages: ["English", "Hindi", "Telugu"],
};

const highPriorityKeywords = [
  { label: "Javascript", matched: true },
  { label: "Typescript", matched: true },
  { label: "Html5", matched: false },
  { label: "Css3", matched: false },
  { label: "React", matched: true },
  { label: "Angular", matched: false },
  { label: "Vue", matched: false },
  { label: "Rest Api", matched: true },
  { label: "Git", matched: true },
  { label: "Ci/Cd", matched: false },
  { label: "Micro Frontends", matched: false },
  { label: "State Management", matched: false },
];

const lowPriorityKeywords = [
  { label: "Accessibility", matched: false },
  { label: "Security", matched: false },
  { label: "Responsive Design", matched: false },
];

export default function ChromeExtension() {
  const [activeTab, setActiveTab] = useState<Tab>("autofill");
  const [sections, setSections] = useState<AutofillSection[]>([
    { id: "resume", label: "Resume", icon: <FileText className="w-4 h-4" />, iconBg: "bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400", status: "filled", expanded: false },
    { id: "cover", label: "Cover Letter", icon: <PenSquare className="w-4 h-4" />, iconBg: "bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400", status: "no-field", expanded: false },
    { id: "unique", label: "Unique Questions", icon: <Star className="w-4 h-4" />, iconBg: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-400", status: "filled", count: "0/0", expanded: false },
    { id: "common", label: "Common Questions", icon: <Users className="w-4 h-4" />, iconBg: "bg-teal-100 text-teal-600 dark:bg-teal-900/40 dark:text-teal-400", status: "filled", count: "0/0", expanded: false },
  ]);

  const toggleSection = (id: string) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, expanded: !s.expanded } : s));
  };

  const matchedCount = highPriorityKeywords.filter(k => k.matched).length;
  const totalKeywords = highPriorityKeywords.length + lowPriorityKeywords.length;
  const matchedTotal = matchedCount + lowPriorityKeywords.filter(k => k.matched).length;
  const matchPercent = Math.round((matchedTotal / totalKeywords) * 100);

  const tabs = [
    { id: "autofill" as Tab, label: "Autofill", icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: "keywords" as Tab, label: "Keywords Score", icon: <ShieldCheck className="w-3.5 h-3.5" /> },
    { id: "profile" as Tab, label: "Profile", icon: <User className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Chrome className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Chrome Extension</h1>
            <p className="text-sm text-muted-foreground">Auto-fill applications, match keywords, and manage your profile</p>
          </div>
        </div>
      </div>

      {/* Extension Simulator */}
      <div className="flex justify-center">
        <div className="w-full max-w-[420px]">
          <Card className="overflow-hidden border-border shadow-xl rounded-2xl">
            {/* Extension Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-card">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <span className="font-bold text-sm text-foreground tracking-tight">HireMate</span>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Job Assistant</p>
                </div>
              </div>
              <button className="w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-border bg-card">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold transition-all duration-200 border-b-2",
                    activeTab === tab.id
                      ? "border-primary text-primary bg-primary/5"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <CardContent className="p-0">
              {activeTab === "autofill" && <AutofillTab sections={sections} toggleSection={toggleSection} />}
              {activeTab === "keywords" && (
                <KeywordsTab
                  matchPercent={matchPercent}
                  matchedTotal={matchedTotal}
                  totalKeywords={totalKeywords}
                  highPriority={highPriorityKeywords}
                  lowPriority={lowPriorityKeywords}
                  matchedHighCount={matchedCount}
                />
              )}
              {activeTab === "profile" && <ProfileTab profile={mockProfile} />}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ─── AUTOFILL TAB ─── */
function AutofillTab({
  sections,
  toggleSection,
}: {
  sections: AutofillSection[];
  toggleSection: (id: string) => void;
}) {
  return (
    <div className="divide-y divide-border">
      {/* Hero CTA */}
      <div className="p-4">
        <div className="rounded-xl bg-primary p-4 text-primary-foreground space-y-3">
          <p className="font-bold text-sm">Autofill this job application!</p>
          <div className="flex items-center gap-2 text-xs">
            <CheckCircle className="w-3.5 h-3.5" />
            <span className="font-medium">Filled 7 fields</span>
          </div>
          <Progress value={100} className="h-1 bg-primary-foreground/20 [&>div]:bg-primary-foreground" />
          <Button
            variant="secondary"
            className="w-full font-semibold text-sm h-9 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            Autofill this page
          </Button>
          <div className="flex items-center gap-2 pt-1">
            <Checkbox id="cache" className="border-primary-foreground/50 data-[state=checked]:bg-primary-foreground data-[state=checked]:text-primary" />
            <label htmlFor="cache" className="text-xs opacity-90 cursor-pointer">Use cache for faster fills</label>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center justify-between px-5 py-3">
        <button className="text-xs font-semibold text-primary hover:underline">Save Job Instead</button>
        <button className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
          Get referrals <ExternalLink className="w-3 h-3" />
        </button>
      </div>

      {/* Sections */}
      <div className="divide-y divide-border">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => toggleSection(section.id)}
            className="flex items-center gap-3 w-full px-5 py-3.5 text-left hover:bg-muted/30 transition-colors"
          >
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", section.iconBg)}>
              {section.icon}
            </div>
            <span className="flex-1 text-sm font-medium text-foreground">{section.label}</span>
            <div className="flex items-center gap-2">
              {section.status === "no-field" && (
                <span className="text-xs text-muted-foreground">No Field Found</span>
              )}
              {section.status === "filled" && section.count && (
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-success" />
                  <span className="text-xs text-muted-foreground">Filled ({section.count})</span>
                </div>
              )}
              {section.expanded ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── KEYWORDS TAB ─── */
function KeywordsTab({
  matchPercent,
  matchedTotal,
  totalKeywords,
  highPriority,
  lowPriority,
  matchedHighCount,
}: {
  matchPercent: number;
  matchedTotal: number;
  totalKeywords: number;
  highPriority: { label: string; matched: boolean }[];
  lowPriority: { label: string; matched: boolean }[];
  matchedHighCount: number;
}) {
  const statusColor = matchPercent >= 70 ? "text-success" : matchPercent >= 40 ? "text-warning" : "text-destructive";
  const statusLabel = matchPercent >= 70 ? "Good Match" : matchPercent >= 40 ? "Needs Work" : "Poor Match";

  return (
    <div className="p-4 space-y-4">
      {/* Resume selector */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-foreground">Resume</label>
        <Select defaultValue="main">
          <SelectTrigger className="h-9 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="main">Sainath_Reddy_Guraka_Resume</SelectItem>
            <SelectItem value="alt">Sainath_Frontend_Resume</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button className="w-full font-semibold text-sm h-9">Tailor Resume</Button>

      <p className="text-[11px] text-muted-foreground">Bold % indicates keyword coverage.</p>

      {/* Score Card */}
      <Card className="border-border">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-foreground">Keyword Match —</p>
            <span className={cn("text-sm font-bold", statusColor)}>{statusLabel}</span>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-xs text-muted-foreground flex-1">
              Your resume has <strong className="text-foreground">{matchedTotal} out of {totalKeywords}</strong> keywords that appear in the job description.
            </p>
            {/* Circular gauge */}
            <div className="relative w-16 h-16 shrink-0">
              <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="none" className="stroke-muted" strokeWidth="5" />
                <circle
                  cx="32" cy="32" r="28" fill="none"
                  className={cn("transition-all duration-700", matchPercent >= 70 ? "stroke-success" : matchPercent >= 40 ? "stroke-warning" : "stroke-destructive")}
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={`${(matchPercent / 100) * 176} 176`}
                />
              </svg>
              <span className={cn("absolute inset-0 flex items-center justify-center text-sm font-bold", statusColor)}>
                {matchPercent}%
              </span>
            </div>
          </div>
          <div className="flex items-start gap-2 bg-warning/10 rounded-lg p-2.5">
            <span className="text-sm">💡</span>
            <p className="text-xs text-foreground">Try to get your score above <strong>70%</strong> to increase your chances!</p>
          </div>
        </CardContent>
      </Card>

      {/* High Priority */}
      <Card className="border-border">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-foreground">High Priority Keywords</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <CheckCircle className="w-3.5 h-3.5 text-success" />
              <span className="font-semibold">{matchedHighCount}/{highPriority.length}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {highPriority.map((kw) => (
              <div key={kw.label} className="flex items-center gap-2">
                <div className={cn(
                  "w-4 h-4 rounded flex items-center justify-center shrink-0",
                  kw.matched ? "bg-primary text-primary-foreground" : "bg-muted"
                )}>
                  {kw.matched && <CheckCircle className="w-2.5 h-2.5" />}
                </div>
                <span className={cn(
                  "text-xs",
                  kw.matched ? "text-primary font-semibold" : "text-muted-foreground"
                )}>
                  {kw.label}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Low Priority */}
      <Card className="border-border">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-foreground">Low Priority Keywords</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <CheckCircle className="w-3.5 h-3.5 text-success" />
              <span className="font-semibold">0/{lowPriority.length}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {lowPriority.map((kw) => (
              <div key={kw.label} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-muted shrink-0" />
                <span className="text-xs text-muted-foreground">{kw.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button variant="outline" className="w-full font-semibold text-sm h-9">Update Job Description</Button>
    </div>
  );
}

/* ─── PROFILE TAB ─── */
function ProfileTab({ profile }: { profile: typeof mockProfile }) {
  return (
    <div className="divide-y divide-border">
      {/* Quick Links */}
      <div className="grid grid-cols-2 gap-3 p-4">
        <Card className="border-border hover:border-primary/30 transition-colors cursor-pointer">
          <CardContent className="p-3">
            <p className="text-xs font-bold text-foreground">Job Matches</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Fill out my preferences →</p>
          </CardContent>
        </Card>
        <Card className="border-border hover:border-primary/30 transition-colors cursor-pointer">
          <CardContent className="p-3">
            <p className="text-xs font-bold text-foreground">Job Tracker</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Add your first job! →</p>
          </CardContent>
        </Card>
      </div>

      {/* Hint */}
      <div className="px-5 py-2.5">
        <p className="text-[11px] text-muted-foreground italic">Click any block of text below to copy it — handy for filling applications.</p>
      </div>

      {/* Profile Card */}
      <div className="p-5 space-y-5">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
            {profile.initials}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-foreground">{profile.name}</h3>
            <p className="text-xs text-muted-foreground">{profile.title}</p>
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
                <RefreshCw className="w-3 h-3" /> Refresh
              </Button>
              <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
                <Edit className="w-3 h-3" /> Edit
              </Button>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-1.5 text-xs text-foreground">
          <div className="flex items-center gap-2"><MapPin className="w-3 h-3 text-muted-foreground" />{profile.location}</div>
          <div className="flex items-center gap-2"><Mail className="w-3 h-3 text-muted-foreground" />{profile.email}</div>
          <div className="flex items-center gap-2"><Phone className="w-3 h-3 text-muted-foreground" />{profile.phone}</div>
        </div>

        <Separator />

        {/* Education */}
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Education</p>
          <div>
            <p className="text-sm font-bold text-foreground">{profile.education.school}</p>
            <p className="text-xs text-muted-foreground">{profile.education.degree}</p>
            <p className="text-[11px] text-muted-foreground">{profile.education.dates}</p>
          </div>
        </div>

        <Separator />

        {/* Experience */}
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Experience</p>
          <div>
            <p className="text-sm font-bold text-foreground">{profile.experience.title}</p>
            <p className="text-xs font-medium text-foreground">{profile.experience.company}</p>
            <p className="text-[11px] text-muted-foreground">{profile.experience.details}</p>
            <ul className="mt-2 space-y-1.5">
              {profile.experience.bullets.map((b, i) => (
                <li key={i} className="text-xs text-muted-foreground flex gap-2">
                  <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full bg-muted-foreground" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator />

        {/* Uploads */}
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Uploads</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-foreground">Resume</span>
            <button className="text-xs text-primary font-semibold hover:underline">Preview</button>
          </div>
        </div>

        <Separator />

        {/* Links */}
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Links</p>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Linkedin className="w-3 h-3 text-muted-foreground" />
              <a href="#" className="text-xs text-primary hover:underline truncate">{profile.linkedin}</a>
            </div>
            <div className="flex items-center gap-2">
              <Github className="w-3 h-3 text-muted-foreground" />
              <a href="#" className="text-xs text-primary hover:underline">Github</a>
            </div>
          </div>
        </div>

        <Separator />

        {/* Skills */}
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Skills</p>
          <div className="flex flex-wrap gap-1.5">
            {profile.skills.map((s) => (
              <Badge key={s} variant="secondary" className="text-[11px] font-normal px-2.5 py-0.5 rounded-md">
                {s}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* Languages */}
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Languages</p>
          <p className="text-xs text-foreground">{profile.languages.join(", ")}</p>
        </div>
      </div>
    </div>
  );
}
