import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { FileBarChart, Upload, ArrowLeft, CheckCircle, AlertTriangle, Star } from "lucide-react";

const mockAnalysis = {
  score: 81,
  strengths: [
    "Strong technical skills section with relevant technologies",
    "Quantified achievements in experience section",
    "Clean, professional formatting",
    "Good use of action verbs",
  ],
  gaps: [
    "Summary could be more role-specific",
    "Missing soft skills (leadership, communication)",
    "No certifications section",
    "Projects section could include more impact metrics",
  ],
  keywords: {
    matched: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Git"],
    missing: ["Kubernetes", "CI/CD", "Agile", "Scrum", "Microservices"],
  },
};

export default function ResumeAnalyzer() {
  const [step, setStep] = useState<"input" | "analyzing" | "result">("input");
  const [fileName, setFileName] = useState("");
  const [jd, setJd] = useState("");

  const handleAnalyze = () => {
    setStep("analyzing");
    setTimeout(() => setStep("result"), 2000);
  };

  if (step === "result") {
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        <Button variant="ghost" onClick={() => setStep("input")}>
          <ArrowLeft className="w-4 h-4" /> New Analysis
        </Button>

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Resume Analysis</h1>
          <p className="text-muted-foreground">{fileName || "Your resume"}</p>
        </div>

        {/* Score */}
        <Card className="text-center">
          <CardContent className="py-8">
            <div className="text-5xl font-bold text-primary mb-2">{mockAnalysis.score}/100</div>
            <p className="text-muted-foreground">Overall Resume Quality</p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Strengths */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Star className="w-4 h-4 text-success" /> Strengths
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockAnalysis.strengths.map((s, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">{s}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Gaps */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-warning" /> Areas to Improve
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockAnalysis.gaps.map((g, i) => (
                <div key={i} className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">{g}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Keywords */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Keyword Analysis</CardTitle>
            <CardDescription>Keywords matched vs job description</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Matched ✓</p>
              <div className="flex flex-wrap gap-2">
                {mockAnalysis.keywords.matched.map((k) => (
                  <Badge key={k} className="bg-success/10 text-success border-0">{k}</Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Missing ✗</p>
              <div className="flex flex-wrap gap-2">
                {mockAnalysis.keywords.missing.map((k) => (
                  <Badge key={k} variant="destructive" className="bg-destructive/10 text-destructive border-0">{k}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === "analyzing") {
    return (
      <div className="max-w-md mx-auto text-center space-y-6 py-20 animate-fade-in">
        <FileBarChart className="w-16 h-16 text-primary mx-auto animate-pulse" />
        <h2 className="text-xl font-bold text-foreground">Analyzing your resume...</h2>
        <p className="text-muted-foreground">Identifying strengths, gaps, and keyword alignment</p>
        <Progress value={55} className="max-w-xs mx-auto" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Resume Analyzer</h1>
        <p className="text-muted-foreground">Get deep insights into your resume quality</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Upload Resume</CardTitle></CardHeader>
        <CardContent>
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-8 cursor-pointer hover:border-primary/30 transition-colors">
            <Upload className="w-8 h-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium text-foreground">{fileName || "Click to upload"}</p>
            <p className="text-xs text-muted-foreground">PDF or DOC</p>
            <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name || "")} />
          </label>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Job Description (Optional)</CardTitle>
          <CardDescription>For keyword comparison</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea rows={6} value={jd} onChange={(e) => setJd(e.target.value)} placeholder="Paste job description..." />
        </CardContent>
      </Card>

      <Button className="w-full" size="lg" onClick={handleAnalyze}>
        <FileBarChart className="w-4 h-4" /> Analyze Resume
      </Button>
    </div>
  );
}
