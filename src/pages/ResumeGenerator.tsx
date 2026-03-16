import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Download, Eye, ArrowLeft, ArrowRight, Sparkles, CheckCircle } from "lucide-react";

const mockResumes = [
  { id: "1", title: "Frontend Engineer Resume", template: "Modern", updated: "Mar 14, 2026" },
  { id: "2", title: "Full Stack Developer", template: "Classic", updated: "Mar 10, 2026" },
];

const templates = [
  { id: "modern", name: "Modern", desc: "Clean, contemporary layout" },
  { id: "classic", name: "Classic", desc: "Traditional professional style" },
  { id: "minimal", name: "Minimal", desc: "Simple and elegant" },
];

export default function ResumeGenerator() {
  const [step, setStep] = useState<"list" | "build">("list");
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [jobDesc, setJobDesc] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 2000);
  };

  if (step === "build") {
    return (
      <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
        <Button variant="ghost" onClick={() => { setStep("list"); setGenerated(false); }}>
          <ArrowLeft className="w-4 h-4" /> Back to resumes
        </Button>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Template</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {templates.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTemplate(t.id)}
                      className={`p-3 rounded-lg border text-center transition-colors ${
                        selectedTemplate === t.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                      }`}
                    >
                      <div className="w-full aspect-[3/4] bg-muted rounded mb-2" />
                      <p className="text-xs font-medium text-foreground">{t.name}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Design Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Font Family</Label>
                    <Select defaultValue="inter">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inter">Inter</SelectItem>
                        <SelectItem value="georgia">Georgia</SelectItem>
                        <SelectItem value="roboto">Roboto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Font Size</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tailor to Job Description</CardTitle>
                <CardDescription>Paste a JD to optimize your resume for this role</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Textarea
                  rows={5}
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  placeholder="Paste job description here..."
                />
                <Button onClick={handleGenerate} disabled={generating} className="w-full">
                  {generating ? (
                    <>Generating...</>
                  ) : (
                    <><Sparkles className="w-4 h-4" /> Generate with AI</>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          <Card className="h-fit sticky top-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Eye className="w-4 h-4" /> Preview
              </CardTitle>
              <Button size="sm" variant="outline">
                <Download className="w-4 h-4" /> Download PDF
              </Button>
            </CardHeader>
            <CardContent>
              <div className="aspect-[8.5/11] bg-card border border-border rounded-lg p-6 text-xs space-y-4 overflow-hidden">
                {/* Mock resume content */}
                <div className="text-center space-y-1">
                  <h2 className="text-lg font-bold text-foreground">Alex Johnson</h2>
                  <p className="text-muted-foreground">Senior Frontend Engineer | React & TypeScript</p>
                  <p className="text-muted-foreground text-[10px]">Bengaluru, India · alex@email.com · +91 98765 43210</p>
                </div>
                <div className="border-t border-border pt-3">
                  <h3 className="font-bold text-foreground uppercase text-[10px] tracking-wider mb-1">Summary</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Passionate software engineer with 4+ years building scalable web applications. Focused on React, TypeScript, and modern frontend architecture.
                  </p>
                </div>
                <div className="border-t border-border pt-3">
                  <h3 className="font-bold text-foreground uppercase text-[10px] tracking-wider mb-2">Experience</h3>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between">
                        <p className="font-medium text-foreground">Senior Frontend Engineer</p>
                        <p className="text-muted-foreground">2022 – Present</p>
                      </div>
                      <p className="text-muted-foreground">TechCorp</p>
                      <p className="text-muted-foreground mt-0.5">Led React migration. Built design system used by 40+ engineers.</p>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <p className="font-medium text-foreground">Full Stack Developer</p>
                        <p className="text-muted-foreground">2020 – 2022</p>
                      </div>
                      <p className="text-muted-foreground">StartupXYZ</p>
                      <p className="text-muted-foreground mt-0.5">Built product from 0 to 10k users. Node.js + React.</p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-border pt-3">
                  <h3 className="font-bold text-foreground uppercase text-[10px] tracking-wider mb-1">Skills</h3>
                  <p className="text-muted-foreground">React, TypeScript, Node.js, Python, PostgreSQL, AWS, Docker, Git, GraphQL, Tailwind CSS</p>
                </div>
                {generated && (
                  <div className="bg-success/10 border border-success/20 rounded p-2 text-success text-[10px] flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> AI-tailored for your target role
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Resume Generator</h1>
          <p className="text-muted-foreground">Build and manage your professional resumes</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="text-xs">3 resumes left</Badge>
          <Button onClick={() => setStep("build")}><Plus className="w-4 h-4" /> New Resume</Button>
        </div>
      </div>

      {mockResumes.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-lg font-medium text-foreground mb-2">Create your first resume</p>
            <p className="text-muted-foreground mb-4">Use your profile data to generate a professional resume</p>
            <Button onClick={() => setStep("build")}>
              <Sparkles className="w-4 h-4" /> Get started
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {mockResumes.map((r) => (
            <Card key={r.id} className="group hover:shadow-md transition-shadow cursor-pointer" onClick={() => setStep("build")}>
              <CardContent className="p-4">
                <div className="aspect-[8.5/11] bg-muted rounded-lg mb-3 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="font-medium text-foreground">{r.title}</p>
                <p className="text-xs text-muted-foreground">Template: {r.template} · Updated {r.updated}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
