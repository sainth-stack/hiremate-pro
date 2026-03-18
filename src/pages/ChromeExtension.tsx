import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Sparkles, ShieldCheck, User, CheckCircle, AlertCircle,
  FileText, PenSquare, Star, Users, ChevronDown, ChevronUp,
  MapPin, Mail, Phone, Linkedin, Github, RefreshCw, Edit,
  Briefcase, X, Chrome, Copy, Check, Zap, Eye, Download,
  GraduationCap, Code, Globe, Upload, Lock, Unlock, RotateCcw,
  Lightbulb, TrendingUp, Target, Award, Clock, Send, Wand2,
  MessageSquare, HelpCircle, Hash, Layers, ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "autofill" | "keywords" | "profile";

interface AutofillSection {
  id: string;
  label: string;
  icon: React.ReactNode;
  iconBg: string;
  status: "filled" | "no-field" | "pending" | "error";
  count?: string;
  expanded: boolean;
  fields?: AutofillField[];
}

interface AutofillField {
  label: string;
  value: string;
  status: "filled" | "skipped" | "error";
}

const mockProfile = {
  initials: "SG",
  name: "Sainath Reddy Guraka",
  title: "Full Stack Developer",
  location: "Bangalore, India",
  email: "sainathreddyguraka@gmail.com",
  phone: "+91 9676688586",
  linkedin: "linkedin.com/in/sainathreddyguraka",
  github: "github.com/sainathreddyguraka",
  portfolio: "sainathreddy.dev",
  education: {
    school: "Jawaharlal Nehru Technological University",
    degree: "B.Tech · Computer Science and Engineering",
    gpa: "8.7/10",
    dates: "Aug 2019 — Apr 2023",
  },
  experience: [
    {
      title: "Full Stack Developer",
      company: "Landmark Group",
      location: "Bangalore, India",
      type: "Full-time",
      dates: "Jan 2025 — Present",
      bullets: [
        "Developed and enhanced features for Styli, a large-scale e-commerce platform used by millions of users, improving performance, UI responsiveness, and stability.",
        "Built a multi-agent GenAI analytics system generating personalized product recommendations and insights.",
        "Reduced page load time by 40% through code splitting and lazy loading optimization.",
      ],
    },
    {
      title: "Software Engineer",
      company: "TCS Digital",
      location: "Hyderabad, India",
      type: "Full-time",
      dates: "Jul 2023 — Dec 2024",
      bullets: [
        "Designed and built microservices architecture serving 100K+ daily active users.",
        "Implemented CI/CD pipelines reducing deployment time by 60%.",
      ],
    },
  ],
  skills: [
    "JavaScript", "TypeScript", "Python", "SQL", "React.js", "React Native",
    "Next.js", "AngularJS", "Material UI", "Bootstrap", "Tailwind CSS",
    "Node.js", "Express.js", "FastAPI", "Cypress", "LangChain", "LangGraph",
    "OpenAI API", "Chroma", "Qdrant", "AWS", "Docker", "Kubernetes",
    "Nginx", "CI/CD Pipelines",
  ],
  softSkills: ["Leadership", "Communication", "Problem Solving", "Team Collaboration"],
  languages: ["English — Fluent", "Hindi — Native", "Telugu — Native"],
  certifications: ["AWS Certified Developer", "Google Cloud Professional"],
};

const highPriorityKeywords = [
  { label: "JavaScript", matched: true, frequency: 5 },
  { label: "TypeScript", matched: true, frequency: 4 },
  { label: "HTML5", matched: false, frequency: 3 },
  { label: "CSS3", matched: false, frequency: 2 },
  { label: "React", matched: true, frequency: 6 },
  { label: "Angular", matched: false, frequency: 2 },
  { label: "Vue.js", matched: false, frequency: 1 },
  { label: "REST API", matched: true, frequency: 3 },
  { label: "Git", matched: true, frequency: 2 },
  { label: "CI/CD", matched: true, frequency: 3 },
  { label: "Micro Frontends", matched: false, frequency: 1 },
  { label: "State Management", matched: false, frequency: 2 },
];

const lowPriorityKeywords = [
  { label: "Accessibility", matched: false, frequency: 1 },
  { label: "Security", matched: false, frequency: 1 },
  { label: "Responsive Design", matched: true, frequency: 2 },
  { label: "SEO", matched: false, frequency: 1 },
  { label: "GraphQL", matched: false, frequency: 1 },
];

const uniqueQuestions = [
  { id: "uq1", question: "Why do you want to work at our company?", answer: "I'm drawn to your mission of democratizing AI for enterprise. Your recent product launches show a commitment to innovation that aligns with my experience building scalable systems.", generated: true },
  { id: "uq2", question: "Describe a project you led from ideation to deployment.", answer: "Led the GenAI analytics system at Landmark Group — designed architecture, coordinated with 3 teams, and shipped to production in 8 weeks serving 2M+ users.", generated: true },
  { id: "uq3", question: "What's your expected salary range?", answer: "", generated: false },
];

const commonQuestions = [
  { id: "cq1", question: "Are you authorized to work in this country?", answer: "Yes", type: "select" },
  { id: "cq2", question: "Years of experience with React", answer: "4", type: "number" },
  { id: "cq3", question: "Are you willing to relocate?", answer: "Yes", type: "select" },
  { id: "cq4", question: "Do you require visa sponsorship?", answer: "No", type: "select" },
  { id: "cq5", question: "What is your earliest start date?", answer: "2 weeks notice", type: "text" },
  { id: "cq6", question: "Gender (optional)", answer: "Male", type: "select" },
  { id: "cq7", question: "Race/Ethnicity (optional)", answer: "Asian", type: "select" },
  { id: "cq8", question: "Veteran status (optional)", answer: "No", type: "select" },
];

export default function ChromeExtension() {
  const [activeTab, setActiveTab] = useState<Tab>("autofill");
  const [autofillProgress, setAutofillProgress] = useState(0);
  const [isAutofilling, setIsAutofilling] = useState(false);
  const [sections, setSections] = useState<AutofillSection[]>([
    {
      id: "resume",
      label: "Resume",
      icon: <FileText className="w-4 h-4" />,
      iconBg: "bg-primary/10 text-primary",
      status: "filled",
      expanded: false,
      fields: [
        { label: "First Name", value: "Sainath Reddy", status: "filled" },
        { label: "Last Name", value: "Guraka", status: "filled" },
        { label: "Email", value: "sainathreddyguraka@gmail.com", status: "filled" },
        { label: "Phone", value: "+91 9676688586", status: "filled" },
        { label: "Location", value: "Bangalore, India", status: "filled" },
        { label: "LinkedIn URL", value: "linkedin.com/in/sainathreddyguraka", status: "filled" },
        { label: "Portfolio URL", value: "sainathreddy.dev", status: "filled" },
      ],
    },
    {
      id: "cover",
      label: "Cover Letter",
      icon: <PenSquare className="w-4 h-4" />,
      iconBg: "bg-warning/10 text-warning",
      status: "filled",
      expanded: false,
      fields: [
        { label: "Cover Letter", value: "AI-generated cover letter tailored to this role...", status: "filled" },
      ],
    },
    {
      id: "unique",
      label: "Unique Questions",
      icon: <Star className="w-4 h-4" />,
      iconBg: "bg-chart-4/10 text-chart-4",
      status: "filled",
      count: `${uniqueQuestions.filter(q => q.answer).length}/${uniqueQuestions.length}`,
      expanded: false,
    },
    {
      id: "common",
      label: "Common Questions",
      icon: <Users className="w-4 h-4" />,
      iconBg: "bg-success/10 text-success",
      status: "filled",
      count: `${commonQuestions.filter(q => q.answer).length}/${commonQuestions.length}`,
      expanded: false,
    },
  ]);

  const toggleSection = (id: string) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, expanded: !s.expanded } : s));
  };

  const handleAutofill = () => {
    setIsAutofilling(true);
    setAutofillProgress(0);
    const interval = setInterval(() => {
      setAutofillProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAutofilling(false);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);
  };

  const matchedHighCount = highPriorityKeywords.filter(k => k.matched).length;
  const matchedLowCount = lowPriorityKeywords.filter(k => k.matched).length;
  const totalKeywords = highPriorityKeywords.length + lowPriorityKeywords.length;
  const matchedTotal = matchedHighCount + matchedLowCount;
  const matchPercent = Math.round((matchedTotal / totalKeywords) * 100);

  const tabs = [
    { id: "autofill" as Tab, label: "Autofill", icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: "keywords" as Tab, label: "Keywords", icon: <ShieldCheck className="w-3.5 h-3.5" /> },
    { id: "profile" as Tab, label: "Profile", icon: <User className="w-3.5 h-3.5" /> },
  ];

  const filledCount = sections.reduce((acc, s) => acc + (s.fields?.filter(f => f.status === "filled").length || 0), 0);
  const totalFields = sections.reduce((acc, s) => acc + (s.fields?.length || 0), 0);

  return (
    <div className="min-h-screen bg-background flex items-start justify-center py-8 px-4">
      <div className="w-full max-w-[440px] space-y-6 animate-fade-in">
        {/* Page Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <Chrome className="w-3.5 h-3.5" />
            Chrome Extension Preview
          </div>
          <h1 className="text-xl font-bold text-foreground">HireMate Assistant</h1>
          <p className="text-sm text-muted-foreground">Preview how the extension works on job applications</p>
        </div>

        {/* Extension Simulator */}
        <Card className="overflow-hidden border-border shadow-2xl rounded-2xl">
          {/* Extension Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-sm">
                <Briefcase className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <span className="font-bold text-sm text-foreground tracking-tight">HireMate</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  <p className="text-[10px] text-muted-foreground font-medium">Connected · linkedin.com</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground transition-colors">
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button className="w-7 h-7 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border bg-card">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold transition-all duration-200 border-b-2 relative",
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30"
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <CardContent className="p-0">
            <div className="max-h-[560px] overflow-y-auto scrollbar-thin">
              {activeTab === "autofill" && (
                <AutofillTab
                  sections={sections}
                  toggleSection={toggleSection}
                  filledCount={filledCount}
                  totalFields={totalFields}
                  onAutofill={handleAutofill}
                  isAutofilling={isAutofilling}
                  progress={Math.min(autofillProgress, 100)}
                />
              )}
              {activeTab === "keywords" && (
                <KeywordsTab
                  matchPercent={matchPercent}
                  matchedTotal={matchedTotal}
                  totalKeywords={totalKeywords}
                  highPriority={highPriorityKeywords}
                  lowPriority={lowPriorityKeywords}
                  matchedHighCount={matchedHighCount}
                  matchedLowCount={matchedLowCount}
                />
              )}
              {activeTab === "profile" && <ProfileTab profile={mockProfile} />}
            </div>
          </CardContent>
        </Card>

        {/* Install CTA */}
        <Card className="border-border bg-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Download className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">Install Chrome Extension</p>
              <p className="text-xs text-muted-foreground">Auto-fill 10x faster on any job board</p>
            </div>
            <Button size="sm" className="shrink-0 gap-1.5 font-semibold text-xs">
              <Chrome className="w-3.5 h-3.5" /> Install
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* ─── AUTOFILL TAB ─── */
function AutofillTab({
  sections,
  toggleSection,
  filledCount,
  totalFields,
  onAutofill,
  isAutofilling,
  progress,
}: {
  sections: AutofillSection[];
  toggleSection: (id: string) => void;
  filledCount: number;
  totalFields: number;
  onAutofill: () => void;
  isAutofilling: boolean;
  progress: number;
}) {
  return (
    <div className="divide-y divide-border">
      {/* Hero CTA */}
      <div className="p-4">
        <div className="rounded-xl bg-gradient-to-br from-primary to-primary/80 p-4 text-primary-foreground space-y-3 relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-primary-foreground/5" />
          <div className="absolute -right-2 -bottom-8 w-16 h-16 rounded-full bg-primary-foreground/5" />

          <div className="relative">
            <div className="flex items-center justify-between mb-1">
              <p className="font-bold text-sm flex items-center gap-1.5">
                <Zap className="w-4 h-4" />
                Autofill Application
              </p>
              <Badge className="bg-primary-foreground/20 text-primary-foreground border-0 text-[10px] font-semibold">
                {filledCount}/{totalFields} fields
              </Badge>
            </div>

            <p className="text-xs text-primary-foreground/80 mb-3">
              {isAutofilling ? "Filling fields..." : progress >= 100 ? "All fields filled successfully!" : "One-click fill for this job application"}
            </p>

            <div className="space-y-1.5 mb-3">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-medium text-primary-foreground/70">Progress</span>
                <span className="font-bold">{Math.round(progress)}%</span>
              </div>
              <Progress
                value={progress}
                className="h-1.5 bg-primary-foreground/20 [&>div]:bg-primary-foreground [&>div]:transition-all [&>div]:duration-300"
              />
            </div>

            <Button
              onClick={onAutofill}
              disabled={isAutofilling}
              className="w-full font-semibold text-sm h-9 bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg"
            >
              {isAutofilling ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  Filling...
                </span>
              ) : progress >= 100 ? (
                <span className="flex items-center gap-1.5"><Check className="w-4 h-4" /> Filled Successfully</span>
              ) : (
                <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4" /> Autofill this page</span>
              )}
            </Button>

            <div className="flex items-center gap-2 pt-2">
              <Checkbox
                id="cache"
                className="border-primary-foreground/40 data-[state=checked]:bg-primary-foreground data-[state=checked]:text-primary h-3.5 w-3.5"
              />
              <label htmlFor="cache" className="text-[11px] opacity-80 cursor-pointer">Use cached answers for faster fills</label>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-0 divide-x divide-border">
        <button className="py-2.5 text-[11px] font-semibold text-primary hover:bg-primary/5 transition-colors flex items-center justify-center gap-1">
          <Download className="w-3 h-3" /> Save Job
        </button>
        <button className="py-2.5 text-[11px] font-semibold text-primary hover:bg-primary/5 transition-colors flex items-center justify-center gap-1">
          <Users className="w-3 h-3" /> Referrals
        </button>
      </div>

      {/* Sections */}
      <div className="divide-y divide-border">
        {sections.map((section) => (
          <div key={section.id}>
            <button
              onClick={() => toggleSection(section.id)}
              className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-muted/30 transition-colors"
            >
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", section.iconBg)}>
                {section.icon}
              </div>
              <span className="flex-1 text-sm font-medium text-foreground">{section.label}</span>
              <div className="flex items-center gap-2">
                {section.count && (
                  <Badge variant="secondary" className="text-[10px] font-semibold px-1.5 py-0 h-5">
                    {section.count}
                  </Badge>
                )}
                {section.status === "filled" && <CheckCircle className="w-3.5 h-3.5 text-success" />}
                {section.status === "no-field" && <AlertCircle className="w-3.5 h-3.5 text-muted-foreground" />}
                {section.status === "error" && <AlertCircle className="w-3.5 h-3.5 text-destructive" />}
                {section.expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
              </div>
            </button>

            {/* Expanded content */}
            {section.expanded && (
              <div className="px-4 pb-3 animate-fade-in">
                {section.id === "resume" && section.fields && (
                  <div className="rounded-lg border border-border overflow-hidden">
                    {section.fields.map((field, i) => (
                      <div
                        key={i}
                        className={cn(
                          "flex items-center justify-between px-3 py-2 text-xs",
                          i !== section.fields!.length - 1 && "border-b border-border"
                        )}
                      >
                        <span className="text-muted-foreground font-medium">{field.label}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-foreground font-medium truncate max-w-[160px]">{field.value}</span>
                          {field.status === "filled" && <CheckCircle className="w-3 h-3 text-success shrink-0" />}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {section.id === "cover" && (
                  <div className="space-y-2">
                    <div className="rounded-lg border border-border p-3 bg-muted/30">
                      <p className="text-xs text-foreground leading-relaxed">
                        Dear Hiring Manager, I am excited to apply for the Full Stack Developer position. With 3+ years of experience building scalable web applications using React, Node.js, and cloud technologies, I am confident I can contribute significantly to your team...
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="h-7 text-[11px] gap-1 flex-1">
                        <Wand2 className="w-3 h-3" /> Regenerate
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 text-[11px] gap-1 flex-1">
                        <Edit className="w-3 h-3" /> Edit
                      </Button>
                      <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                )}

                {section.id === "unique" && (
                  <div className="space-y-2">
                    {uniqueQuestions.map((q) => (
                      <div key={q.id} className="rounded-lg border border-border p-3 space-y-2">
                        <div className="flex items-start gap-2">
                          <HelpCircle className="w-3.5 h-3.5 text-chart-4 shrink-0 mt-0.5" />
                          <p className="text-xs font-semibold text-foreground leading-snug">{q.question}</p>
                        </div>
                        {q.answer ? (
                          <div className="ml-6 space-y-1.5">
                            <p className="text-xs text-muted-foreground leading-relaxed">{q.answer}</p>
                            <div className="flex items-center gap-1.5">
                              {q.generated && (
                                <Badge variant="secondary" className="text-[9px] px-1.5 py-0 h-4 gap-0.5">
                                  <Sparkles className="w-2.5 h-2.5" /> AI Generated
                                </Badge>
                              )}
                              <button className="text-[10px] text-primary font-semibold hover:underline">Edit</button>
                            </div>
                          </div>
                        ) : (
                          <div className="ml-6 flex items-center gap-2">
                            <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4 text-warning border-warning/30">
                              Needs Answer
                            </Badge>
                            <button className="text-[10px] text-primary font-semibold hover:underline flex items-center gap-0.5">
                              <Wand2 className="w-2.5 h-2.5" /> Generate
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {section.id === "common" && (
                  <div className="rounded-lg border border-border overflow-hidden">
                    {commonQuestions.map((q, i) => (
                      <div
                        key={q.id}
                        className={cn(
                          "flex items-center justify-between px-3 py-2.5 text-xs",
                          i !== commonQuestions.length - 1 && "border-b border-border"
                        )}
                      >
                        <span className="text-muted-foreground flex-1 pr-2 leading-snug">{q.question}</span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-foreground font-medium">{q.answer}</span>
                          {q.answer ? (
                            <CheckCircle className="w-3 h-3 text-success" />
                          ) : (
                            <AlertCircle className="w-3 h-3 text-warning" />
                          )}
                        </div>
                      </div>
                    ))}
                    <div className="px-3 py-2 bg-muted/30 border-t border-border">
                      <button className="text-[10px] text-primary font-semibold hover:underline flex items-center gap-1">
                        <Edit className="w-2.5 h-2.5" /> Edit all answers in settings
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Stats */}
      <div className="px-4 py-3 bg-muted/20">
        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Last fill: 2 min ago</span>
          <span className="flex items-center gap-1"><Layers className="w-3 h-3" /> 47 applications filled</span>
        </div>
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
  matchedLowCount,
}: {
  matchPercent: number;
  matchedTotal: number;
  totalKeywords: number;
  highPriority: { label: string; matched: boolean; frequency: number }[];
  lowPriority: { label: string; matched: boolean; frequency: number }[];
  matchedHighCount: number;
  matchedLowCount: number;
}) {
  const statusColor = matchPercent >= 70 ? "text-success" : matchPercent >= 40 ? "text-warning" : "text-destructive";
  const statusBg = matchPercent >= 70 ? "bg-success/10" : matchPercent >= 40 ? "bg-warning/10" : "bg-destructive/10";
  const statusLabel = matchPercent >= 70 ? "Strong Match" : matchPercent >= 40 ? "Needs Improvement" : "Weak Match";
  const strokeColor = matchPercent >= 70 ? "stroke-success" : matchPercent >= 40 ? "stroke-warning" : "stroke-destructive";

  return (
    <div className="p-4 space-y-4">
      {/* Resume selector */}
      <div className="flex items-center gap-2">
        <div className="flex-1 space-y-1">
          <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Active Resume</label>
          <Select defaultValue="main">
            <SelectTrigger className="h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="main">Sainath_Reddy_Resume.pdf</SelectItem>
              <SelectItem value="alt">Sainath_Frontend_Resume.pdf</SelectItem>
              <SelectItem value="be">Sainath_Backend_Resume.pdf</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button size="sm" className="h-8 mt-4 text-xs gap-1 font-semibold">
          <Target className="w-3 h-3" /> Tailor
        </Button>
      </div>

      {/* Score Card */}
      <Card className="border-border overflow-hidden">
        <CardContent className="p-0">
          <div className="p-4 flex items-center gap-4">
            {/* Circular gauge */}
            <div className="relative w-20 h-20 shrink-0">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="34" fill="none" className="stroke-muted" strokeWidth="6" />
                <circle
                  cx="40" cy="40" r="34" fill="none"
                  className={cn("transition-all duration-1000", strokeColor)}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${(matchPercent / 100) * 213.6} 213.6`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={cn("text-lg font-bold leading-none", statusColor)}>{matchPercent}%</span>
                <span className="text-[8px] text-muted-foreground font-medium">MATCH</span>
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-1.5">
                <Badge className={cn("text-[10px] font-bold border-0 px-2", statusBg, statusColor)}>
                  {statusLabel}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">{matchedTotal}</strong> of <strong className="text-foreground">{totalKeywords}</strong> keywords matched from the job description.
              </p>
              <div className="flex gap-3 text-[10px]">
                <span className="text-muted-foreground">High: <strong className="text-foreground">{matchedHighCount}/{highPriority.length}</strong></span>
                <span className="text-muted-foreground">Low: <strong className="text-foreground">{matchedLowCount}/{lowPriority.length}</strong></span>
              </div>
            </div>
          </div>

          {/* Tip */}
          <div className="flex items-start gap-2 bg-primary/5 px-4 py-2.5 border-t border-border">
            <Lightbulb className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
            <p className="text-[11px] text-foreground">Aim for <strong>70%+</strong> match rate. Click "Tailor" to auto-optimize your resume for this role.</p>
          </div>
        </CardContent>
      </Card>

      {/* High Priority */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-destructive" />
            <p className="text-xs font-bold text-foreground">High Priority</p>
          </div>
          <span className="text-[10px] font-semibold text-muted-foreground">
            {matchedHighCount}/{highPriority.length} matched
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {highPriority.map((kw) => (
            <div
              key={kw.label}
              className={cn(
                "flex items-center gap-2 px-2.5 py-2 rounded-lg border transition-colors",
                kw.matched
                  ? "border-success/30 bg-success/5"
                  : "border-border bg-card hover:bg-muted/30"
              )}
            >
              <div className={cn(
                "w-4 h-4 rounded flex items-center justify-center shrink-0",
                kw.matched ? "bg-success text-success-foreground" : "bg-muted"
              )}>
                {kw.matched && <Check className="w-2.5 h-2.5" />}
              </div>
              <div className="flex-1 min-w-0">
                <span className={cn(
                  "text-[11px] block truncate",
                  kw.matched ? "text-foreground font-semibold" : "text-muted-foreground"
                )}>
                  {kw.label}
                </span>
              </div>
              <span className="text-[9px] text-muted-foreground font-medium">×{kw.frequency}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Low Priority */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-warning" />
            <p className="text-xs font-bold text-foreground">Low Priority</p>
          </div>
          <span className="text-[10px] font-semibold text-muted-foreground">
            {matchedLowCount}/{lowPriority.length} matched
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {lowPriority.map((kw) => (
            <div
              key={kw.label}
              className={cn(
                "flex items-center gap-2 px-2.5 py-2 rounded-lg border transition-colors",
                kw.matched
                  ? "border-success/30 bg-success/5"
                  : "border-border bg-card hover:bg-muted/30"
              )}
            >
              <div className={cn(
                "w-4 h-4 rounded flex items-center justify-center shrink-0",
                kw.matched ? "bg-success text-success-foreground" : "bg-muted"
              )}>
                {kw.matched && <Check className="w-2.5 h-2.5" />}
              </div>
              <span className={cn(
                "text-[11px] flex-1 truncate",
                kw.matched ? "text-foreground font-semibold" : "text-muted-foreground"
              )}>
                {kw.label}
              </span>
              <span className="text-[9px] text-muted-foreground font-medium">×{kw.frequency}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Missing Keywords Suggestions */}
      <Card className="border-border">
        <CardContent className="p-3 space-y-2">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-primary" />
            <p className="text-xs font-bold text-foreground">Quick Suggestions</p>
          </div>
          <p className="text-[11px] text-muted-foreground">Add these missing keywords to boost your score:</p>
          <div className="flex flex-wrap gap-1">
            {highPriority.filter(k => !k.matched).slice(0, 4).map((kw) => (
              <Badge
                key={kw.label}
                variant="outline"
                className="text-[10px] cursor-pointer hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-colors gap-1"
              >
                + {kw.label}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button variant="outline" className="w-full font-semibold text-xs h-8 gap-1.5">
        <RefreshCw className="w-3 h-3" /> Update Job Description
      </Button>
    </div>
  );
}

/* ─── PROFILE TAB ─── */
function ProfileTab({ profile }: { profile: typeof mockProfile }) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1500);
  };

  const CopyButton = ({ text, field }: { text: string; field: string }) => (
    <button
      onClick={() => handleCopy(text, field)}
      className="w-6 h-6 rounded-md hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-primary transition-colors shrink-0"
    >
      {copiedField === field ? <Check className="w-3 h-3 text-success" /> : <Copy className="w-3 h-3" />}
    </button>
  );

  return (
    <div className="divide-y divide-border">
      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-0 divide-x divide-border">
        <div className="py-3 text-center">
          <p className="text-lg font-bold text-foreground">47</p>
          <p className="text-[9px] text-muted-foreground font-medium uppercase tracking-wider">Applications</p>
        </div>
        <div className="py-3 text-center">
          <p className="text-lg font-bold text-success">12</p>
          <p className="text-[9px] text-muted-foreground font-medium uppercase tracking-wider">Interviews</p>
        </div>
        <div className="py-3 text-center">
          <p className="text-lg font-bold text-primary">89%</p>
          <p className="text-[9px] text-muted-foreground font-medium uppercase tracking-wider">Fill Rate</p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0 shadow-md">
            {profile.initials}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-foreground">{profile.name}</h3>
            <p className="text-xs text-muted-foreground">{profile.title}</p>
            <div className="flex gap-1.5 mt-2">
              <Button variant="outline" size="sm" className="h-6 text-[10px] gap-1 px-2">
                <RefreshCw className="w-2.5 h-2.5" /> Sync
              </Button>
              <Button variant="outline" size="sm" className="h-6 text-[10px] gap-1 px-2">
                <Edit className="w-2.5 h-2.5" /> Edit
              </Button>
              <Button variant="outline" size="sm" className="h-6 text-[10px] gap-1 px-2">
                <Eye className="w-2.5 h-2.5" /> Preview
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 gap-1">
          {[
            { icon: <MapPin className="w-3 h-3" />, label: "Location", value: profile.location },
            { icon: <Mail className="w-3 h-3" />, label: "Email", value: profile.email },
            { icon: <Phone className="w-3 h-3" />, label: "Phone", value: profile.phone },
            { icon: <Linkedin className="w-3 h-3" />, label: "LinkedIn", value: profile.linkedin },
            { icon: <Github className="w-3 h-3" />, label: "GitHub", value: profile.github },
            { icon: <Globe className="w-3 h-3" />, label: "Portfolio", value: profile.portfolio },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-muted/30 transition-colors group">
              <span className="text-muted-foreground">{item.icon}</span>
              <span className="text-xs text-foreground flex-1 truncate">{item.value}</span>
              <CopyButton text={item.value} field={item.label} />
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-1.5">
          <GraduationCap className="w-3.5 h-3.5 text-primary" />
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Education</p>
        </div>
        <div className="rounded-lg border border-border p-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-bold text-foreground">{profile.education.school}</p>
              <p className="text-[11px] text-muted-foreground">{profile.education.degree}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-muted-foreground">{profile.education.dates}</span>
                <Badge variant="secondary" className="text-[9px] px-1.5 py-0 h-4">GPA: {profile.education.gpa}</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Experience */}
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-1.5">
          <Briefcase className="w-3.5 h-3.5 text-primary" />
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Experience</p>
        </div>
        <div className="space-y-2">
          {profile.experience.map((exp, i) => (
            <div key={i} className="rounded-lg border border-border p-3 space-y-2">
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-foreground">{exp.title}</p>
                  <Badge variant="secondary" className="text-[9px] px-1.5 py-0 h-4">{exp.type}</Badge>
                </div>
                <p className="text-[11px] font-medium text-primary">{exp.company}</p>
                <p className="text-[10px] text-muted-foreground">{exp.location} · {exp.dates}</p>
              </div>
              <ul className="space-y-1">
                {exp.bullets.map((b, j) => (
                  <li key={j} className="text-[11px] text-muted-foreground flex gap-2 leading-relaxed">
                    <span className="shrink-0 mt-1.5 w-1 h-1 rounded-full bg-primary/50" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-primary" />
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Certifications</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {profile.certifications.map((c) => (
            <Badge key={c} variant="outline" className="text-[10px] gap-1 font-normal">
              <Award className="w-2.5 h-2.5 text-warning" /> {c}
            </Badge>
          ))}
        </div>
      </div>

      {/* Uploads */}
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-1.5">
          <Upload className="w-3.5 h-3.5 text-primary" />
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Uploads</p>
        </div>
        <div className="rounded-lg border border-border p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
              <FileText className="w-4 h-4 text-destructive" />
            </div>
            <div>
              <p className="text-xs font-medium text-foreground">Sainath_Resume.pdf</p>
              <p className="text-[10px] text-muted-foreground">Updated 2 days ago · 142 KB</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <Eye className="w-3.5 h-3.5" />
            </Button>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <Download className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Code className="w-3.5 h-3.5 text-primary" />
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Technical Skills</p>
          </div>
          <span className="text-[10px] text-muted-foreground">{profile.skills.length} skills</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {profile.skills.map((s) => (
            <Badge
              key={s}
              variant="secondary"
              className="text-[10px] font-normal px-2 py-0.5 rounded-md cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
              onClick={() => navigator.clipboard.writeText(s)}
            >
              {s}
            </Badge>
          ))}
        </div>
      </div>

      {/* Soft Skills */}
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5 text-primary" />
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Soft Skills</p>
        </div>
        <div className="flex flex-wrap gap-1">
          {profile.softSkills.map((s) => (
            <Badge key={s} variant="outline" className="text-[10px] font-normal px-2 py-0.5 rounded-md">
              {s}
            </Badge>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-primary" />
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Languages</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {profile.languages.map((l) => (
            <Badge key={l} variant="secondary" className="text-[10px] font-normal px-2 py-0.5">
              {l}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
