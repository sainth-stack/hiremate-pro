import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  FileText, Plus, Download, ArrowLeft, Sparkles, ChevronDown, ChevronUp,
  Pencil, CheckCircle2, Loader2
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// ─── Mock Data ───────────────────────────────────────
const mockResumes = [
  { id: "1", title: "Frontend Engineer Resume", template: "Modern", updated: "Mar 14, 2026" },
  { id: "2", title: "Full Stack Developer", template: "Classic", updated: "Mar 10, 2026" },
];

const resumeData = {
  name: "Alex Johnson",
  email: "alex.johnson@email.com",
  phone: "9876543210",
  links: "Github | www.linkedin.com/in/alexjohnson | Portfolio",
  headline: "Senior Frontend Engineer",
  summary:
    "Full Stack Developer with a strong background in building scalable web applications and AI-driven analytics systems. Proficient in a wide range of technologies including JavaScript, Python, and various frontend and backend frameworks. Demonstrated ability to lead projects and improve application performance and user satisfaction.",
  skills: {
    "Languages": "JavaScript, TypeScript, Python, SQL",
    "Frontend Technologies": "React.js, React Native, Next.js, AngularJS, Material UI, Bootstrap, Tailwind CSS",
    "Backend Technologies": "Node.js, Express.js, FastAPI, Cypress, Rest API",
    "DevOps & Cloud": "AWS, Docker, Kubernetes, Nginx, CI/CD Pipelines",
  },
  experience: [
    {
      company: "TechCorp, Bangalore, India",
      role: "Senior Frontend Engineer",
      dates: "Jan 2024 – Present",
      bullets: [
        "Developed a multi-agent GenAI analytics system leveraging **machine learning** to create personalized dashboards based on user behavior and business metrics.",
        "Implemented GenAI pipelines with FastAPI and **REST API** for analytics, summarization, and automated reporting, enhancing **accessibility** and user experience.",
        "Enhanced application scalability and deployment workflows using AWS, Docker, and **CI/CD**, ensuring robust **security** and **cloud** integration.",
        "Improved features for a large-scale e-commerce platform, utilizing **Angular**, **React**, **CSS3**, and **JavaScript** to boost performance and UI responsiveness.",
      ],
    },
    {
      company: "StartupXYZ, Bangalore, India",
      role: "Software Development Engineer I",
      dates: "Apr 2022 – Dec 2023",
      bullets: [
        "Developed mobile/web apps using **Angular**, **HTML5**, and **CSS3** for 10,000+ users, enhancing **accessibility** and improving workflows.",
        "Created the Admin Panel with **REST API** integration to monitor 1000+ devices, leveraging **cloud** technology to reduce operational overhead.",
        "Implemented **CI/CD** practices for frontend and backend features, enhancing app performance and reliability through efficient deployment processes.",
      ],
    },
  ],
  education: [
    {
      institution: "Jawaharlal Nehru Technological University",
      degree: "B.Tech in Computer Science and Engineering",
      dates: "Aug 2019 – Apr 2023",
      score: "8.5/10",
    },
  ],
  projects: [
    {
      name: "Multi-Agent GenAI Platform",
      tech: "React.js, FastAPI, LangGraph, LangChain, Qdrant, ChromaDB, PostgreSQL",
      bullets: [
        "Built a multi-agent system for personalized analytics dashboards.",
        "Integrated vector search with Qdrant for semantic document retrieval.",
      ],
    },
  ],
};

const generationMessages = [
  { msg: "Analyzing your profile data...", delay: 0 },
  { msg: "Extracting key skills and experience...", delay: 800 },
  { msg: "Matching keywords with job description...", delay: 1600 },
  { msg: "Optimizing for ATS compatibility...", delay: 2400 },
  { msg: "Generating professional summary...", delay: 3200 },
  { msg: "Structuring resume sections...", delay: 4000 },
  { msg: "Applying formatting and design...", delay: 4800 },
  { msg: "Running final quality checks...", delay: 5600 },
  { msg: "Your resume is ready! ✨", delay: 6400 },
];

// ─── Sections for editor ─────────────────────────────
const editorSections = [
  { id: "personal", label: "Personal Information", count: null },
  { id: "headline", label: "Professional Headline", count: null },
  { id: "summary", label: "Professional Summary", count: null },
  { id: "education", label: "Education", count: "1 entries" },
  { id: "experience", label: "Experience", count: "2 roles" },
  { id: "skills", label: "Skills", count: "25 technical, 2 soft" },
  { id: "projects", label: "Projects", count: "2 projects" },
];

// ─── Resume Preview Component ────────────────────────
function ResumePreview({ className }: { className?: string }) {
  return (
    <div className={cn("bg-card border border-border rounded-lg p-8 text-xs space-y-5 font-sans", className)}>
      {/* Name Header */}
      <div className="text-center space-y-1.5 pb-3 border-b border-border">
        <h2 className="text-xl font-bold text-foreground">{resumeData.name}</h2>
        <p className="text-muted-foreground text-[11px]">
          {resumeData.email} | {resumeData.phone} | {resumeData.links}
        </p>
      </div>

      {/* Summary */}
      <div>
        <h3 className="font-bold text-foreground uppercase text-[11px] tracking-wider mb-1.5 border-b border-foreground/20 pb-1">
          Professional Summary
        </h3>
        <p className="text-muted-foreground leading-relaxed text-[11px]">{resumeData.summary}</p>
      </div>

      {/* Skills */}
      <div>
        <h3 className="font-bold text-foreground uppercase text-[11px] tracking-wider mb-1.5 border-b border-foreground/20 pb-1">
          Skills
        </h3>
        <div className="space-y-0.5">
          {Object.entries(resumeData.skills).map(([cat, val]) => (
            <p key={cat} className="text-[11px] text-muted-foreground">
              <span className="font-semibold text-foreground">{cat}:</span> {val}
            </p>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div>
        <h3 className="font-bold text-foreground uppercase text-[11px] tracking-wider mb-2 border-b border-foreground/20 pb-1">
          Work Experience
        </h3>
        <div className="space-y-4">
          {resumeData.experience.map((exp, i) => (
            <div key={i}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-foreground text-[11px]">{exp.company}</p>
                  <p className="italic text-muted-foreground text-[10px]">{exp.role}</p>
                </div>
                <p className="text-muted-foreground text-[10px] shrink-0">{exp.dates}</p>
              </div>
              <ul className="mt-1.5 space-y-1">
                {exp.bullets.map((b, j) => (
                  <li key={j} className="text-muted-foreground text-[10px] leading-relaxed pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-foreground">
                    {b.replace(/\*\*/g, "")}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div>
        <h3 className="font-bold text-foreground uppercase text-[11px] tracking-wider mb-1.5 border-b border-foreground/20 pb-1">
          Education
        </h3>
        {resumeData.education.map((edu, i) => (
          <div key={i} className="flex justify-between">
            <div>
              <p className="font-semibold text-foreground text-[11px]">{edu.institution}</p>
              <p className="text-muted-foreground text-[10px]">{edu.degree}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-muted-foreground text-[10px]">{edu.dates}</p>
              <p className="text-muted-foreground text-[10px]">{edu.score}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div>
        <h3 className="font-bold text-foreground uppercase text-[11px] tracking-wider mb-1.5 border-b border-foreground/20 pb-1">
          Projects
        </h3>
        {resumeData.projects.map((proj, i) => (
          <div key={i}>
            <p className="font-semibold text-foreground text-[11px]">{proj.name}</p>
            <p className="text-muted-foreground text-[10px] italic">{proj.tech}</p>
            <ul className="mt-1 space-y-0.5">
              {proj.bullets.map((b, j) => (
                <li key={j} className="text-muted-foreground text-[10px] leading-relaxed pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-foreground">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Generation Loading Screen ───────────────────────
function GenerationLoading({ onComplete }: { onComplete: () => void }) {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    generationMessages.forEach((item, i) => {
      setTimeout(() => {
        setVisibleMessages(prev => [...prev, i]);
        setProgress(((i + 1) / generationMessages.length) * 100);
        if (i === generationMessages.length - 1) {
          setTimeout(onComplete, 800);
        }
      }, item.delay);
    });
  }, [onComplete]);

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
      {/* Animated loader */}
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 rounded-full border-4 border-muted" />
        <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin-slow" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-primary animate-pulse" />
        </div>
      </div>

      <h2 className="text-xl font-bold text-foreground mb-2">Generating Your Resume</h2>
      <p className="text-muted-foreground text-sm mb-8">Our AI is crafting a tailored resume for you</p>

      {/* Progress bar */}
      <div className="w-full max-w-md mb-8">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-right">{Math.round(progress)}%</p>
      </div>

      {/* Real-time messages */}
      <div className="w-full max-w-md space-y-3">
        {generationMessages.map((item, i) => {
          const isVisible = visibleMessages.includes(i);
          const isLatest = visibleMessages[visibleMessages.length - 1] === i;
          const isComplete = i < (visibleMessages[visibleMessages.length - 1] ?? -1);

          return (
            <div
              key={i}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-500",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 h-0 overflow-hidden",
                isLatest ? "bg-primary/10 text-primary" : "bg-transparent text-muted-foreground",
                isComplete && "text-muted-foreground"
              )}
              style={{
                transitionDelay: isVisible ? "0ms" : "0ms",
              }}
            >
              {isComplete ? (
                <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
              ) : isLatest ? (
                <div className="flex gap-1 shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" style={{ animationDelay: "0.2s" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-dot" style={{ animationDelay: "0.4s" }} />
                </div>
              ) : (
                <div className="w-4 h-4 shrink-0" />
              )}
              <span className="text-sm font-medium">{item.msg}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Editor View (Post-Generation) ───────────────────
function ResumeEditor({ onBack }: { onBack: () => void }) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"content" | "design">("content");

  const toggleSection = (id: string) => {
    setExpandedSection(prev => prev === id ? null : id);
  };

  return (
    <div className="animate-fade-in">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-muted-foreground">
            <ArrowLeft className="w-4 h-4 mr-1" /> Documents
          </Button>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm text-muted-foreground">Resume Editor</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1" /> Download
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            <Download className="w-4 h-4 mr-1" /> Save & Use Resume
          </Button>
        </div>
      </div>

      {/* Keyword match badge */}
      <div className="flex items-center gap-3 mb-4 justify-end">
        <Badge variant="outline" className="text-primary border-primary/30">
          15 of 18 keywords
        </Badge>
        <Badge variant="outline" className="text-success border-success/30 font-semibold">
          83% match
        </Badge>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Editor Panel */}
        <div className="space-y-4">
          {/* Resume title */}
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-lg font-bold text-foreground">Alex_Johnson_Resume</h2>
            <Pencil className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
          </div>

          {/* Tailored badge */}
          <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card">
            <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Resume tailored to job</p>
              <p className="text-sm font-semibold text-foreground">Software Engineer</p>
            </div>
            <Button variant="outline" size="sm" className="text-xs shrink-0">Edit Job</Button>
            <Button size="sm" className="text-xs shrink-0">
              <Sparkles className="w-3 h-3 mr-1" /> AI Generate
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border">
            <button
              onClick={() => setActiveTab("content")}
              className={cn(
                "px-4 py-2.5 text-sm font-medium transition-colors relative",
                activeTab === "content"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Sparkles className="w-3.5 h-3.5 inline mr-1.5" />
              Edit Content
              {activeTab === "content" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("design")}
              className={cn(
                "px-4 py-2.5 text-sm font-medium transition-colors relative",
                activeTab === "design"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Edit Design
              {activeTab === "design" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          </div>

          {/* Accordion sections */}
          <div className="space-y-2">
            {editorSections.map((section) => (
              <div
                key={section.id}
                className="border border-border rounded-lg overflow-hidden bg-card transition-all"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{section.label}</span>
                    {section.count && (
                      <span className="text-xs text-muted-foreground">{section.count}</span>
                    )}
                  </div>
                  {expandedSection === section.id ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
                {expandedSection === section.id && (
                  <div className="px-4 pb-4 pt-1 border-t border-border animate-fade-in">
                    <p className="text-sm text-muted-foreground">
                      Edit your {section.label.toLowerCase()} details here.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Generate New */}
          <Button variant="outline" className="w-full border-dashed">
            <Sparkles className="w-4 h-4 mr-2" /> Generate New
          </Button>
        </div>

        {/* Right: Resume Preview */}
        <div className="sticky top-6 h-fit">
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between py-3 px-4 bg-muted/30 border-b border-border">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <ArrowLeft className="w-4 h-4 cursor-pointer hover:text-foreground" />
                <span className="font-medium">1 / 2</span>
                <ArrowLeft className="w-4 h-4 rotate-180 cursor-pointer hover:text-foreground" />
              </div>
              <span className="text-xs text-muted-foreground">100%</span>
            </CardHeader>
            <CardContent className="p-0 max-h-[75vh] overflow-y-auto scrollbar-thin">
              <ResumePreview className="rounded-none border-0 shadow-none" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────
export default function ResumeGenerator() {
  const [view, setView] = useState<"list" | "input" | "generating" | "editor">("list");
  const [jobDesc, setJobDesc] = useState("");

  const handleStartGeneration = useCallback(() => {
    setView("generating");
  }, []);

  const handleGenerationComplete = useCallback(() => {
    setView("editor");
  }, []);

  if (view === "generating") {
    return <GenerationLoading onComplete={handleGenerationComplete} />;
  }

  if (view === "editor") {
    return <ResumeEditor onBack={() => setView("list")} />;
  }

  if (view === "input") {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
        <Button variant="ghost" onClick={() => setView("list")} className="text-muted-foreground">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>

        <div className="text-center space-y-2 mb-8">
          <h1 className="text-2xl font-bold text-foreground">Create New Resume</h1>
          <p className="text-muted-foreground">Paste a job description to tailor your resume, or generate a general one</p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Job Description <span className="text-muted-foreground">(optional)</span>
              </label>
              <Textarea
                rows={8}
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                placeholder="Paste the job description here to tailor your resume for this specific role..."
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1.5">
                Adding a job description helps our AI optimize your resume for ATS and keyword matching
              </p>
            </div>

            <Button onClick={handleStartGeneration} className="w-full h-12 text-base">
              <Sparkles className="w-5 h-5 mr-2" />
              {jobDesc.length > 0 ? "Generate Tailored Resume" : "Generate Resume"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // List view
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link to="/ai-resume-studio" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              AI Resume Studio
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm font-medium text-foreground">Resume Generator</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Resume Generator</h1>
          <p className="text-muted-foreground">Build and manage your professional resumes</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="text-xs">3 resumes left</Badge>
          <Button onClick={() => setView("input")}>
            <Plus className="w-4 h-4 mr-1" /> New Resume
          </Button>
        </div>
      </div>

      {mockResumes.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-lg font-medium text-foreground mb-2">Create your first resume</p>
            <p className="text-muted-foreground mb-4">Use your profile data to generate a professional resume</p>
            <Button onClick={() => setView("input")}>
              <Sparkles className="w-4 h-4 mr-1" /> Get started
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {mockResumes.map((r) => (
            <Card
              key={r.id}
              className="group hover:shadow-md hover:border-primary/20 transition-all cursor-pointer"
              onClick={() => setView("editor")}
            >
              <CardContent className="p-4">
                <div className="aspect-[8.5/11] bg-muted rounded-lg mb-3 flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                  <FileText className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="font-medium text-foreground">{r.title}</p>
                <p className="text-xs text-muted-foreground">
                  Template: {r.template} · Updated {r.updated}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
