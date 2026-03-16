import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScanSearch, Upload, FileText, CheckCircle, AlertTriangle, XCircle, ArrowLeft } from "lucide-react";

const mockResult = {
  score: 74,
  breakdown: [
    { label: "Keyword Match", score: 82, status: "good" },
    { label: "Formatting", score: 90, status: "good" },
    { label: "Experience Relevance", score: 65, status: "warning" },
    { label: "Skills Alignment", score: 58, status: "warning" },
    { label: "Education", score: 95, status: "good" },
  ],
  suggestions: [
    { type: "success", text: "Strong keyword density for 'React' and 'TypeScript'" },
    { type: "success", text: "Clean formatting — passes most ATS parsers" },
    { type: "warning", text: "Add more quantifiable achievements (e.g. 'Improved performance by 40%')" },
    { type: "warning", text: "Include 'CI/CD' and 'Agile' — mentioned in JD but missing from resume" },
    { type: "error", text: "Missing 'Kubernetes' — required skill in job description" },
  ],
};

export default function ATSScanner() {
  const [step, setStep] = useState<"input" | "scanning" | "result">("input");
  const [jd, setJd] = useState("");
  const [fileName, setFileName] = useState("");

  const handleScan = () => {
    if (jd.length < 50) return;
    setStep("scanning");
    setTimeout(() => setStep("result"), 2500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  if (step === "result") {
    const scoreColor = mockResult.score >= 75 ? "text-success" : mockResult.score >= 50 ? "text-warning" : "text-destructive";
    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        <Button variant="ghost" onClick={() => setStep("input")}>
          <ArrowLeft className="w-4 h-4" /> New Scan
        </Button>

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground">ATS Scan Report</h1>
          <p className="text-muted-foreground">{fileName || "Resume.pdf"}</p>
        </div>

        {/* Score */}
        <Card className="text-center">
          <CardContent className="py-8">
            <div className="relative w-28 h-28 mx-auto mb-4">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
                <circle cx="60" cy="60" r="52" fill="none"
                  stroke={mockResult.score >= 75 ? "hsl(var(--success))" : mockResult.score >= 50 ? "hsl(var(--warning))" : "hsl(var(--destructive))"}
                  strokeWidth="10" strokeLinecap="round"
                  strokeDasharray={`${(mockResult.score / 100) * 327} 327`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-3xl font-bold ${scoreColor}`}>{mockResult.score}</span>
              </div>
            </div>
            <p className="text-muted-foreground">ATS Compatibility Score</p>
          </CardContent>
        </Card>

        {/* Breakdown */}
        <Card>
          <CardHeader><CardTitle className="text-base">Score Breakdown</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {mockResult.breakdown.map((b) => (
              <div key={b.label} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground">{b.label}</span>
                  <span className={b.status === "good" ? "text-success" : "text-warning"}>{b.score}%</span>
                </div>
                <Progress value={b.score} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Suggestions */}
        <Card>
          <CardHeader><CardTitle className="text-base">Suggestions</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {mockResult.suggestions.map((s, i) => (
              <div key={i} className="flex items-start gap-3">
                {s.type === "success" && <CheckCircle className="w-4 h-4 text-success shrink-0 mt-0.5" />}
                {s.type === "warning" && <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />}
                {s.type === "error" && <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />}
                <p className="text-sm text-foreground">{s.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (step === "scanning") {
    return (
      <div className="max-w-md mx-auto text-center space-y-6 py-20 animate-fade-in">
        <ScanSearch className="w-16 h-16 text-primary mx-auto animate-pulse" />
        <h2 className="text-xl font-bold text-foreground">Scanning your resume...</h2>
        <p className="text-muted-foreground">Analyzing ATS compatibility against the job description</p>
        <Progress value={65} className="max-w-xs mx-auto" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground">ATS Scanner</h1>
        <p className="text-muted-foreground">Check if your resume passes Applicant Tracking Systems</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Upload Resume</CardTitle>
        </CardHeader>
        <CardContent>
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-8 cursor-pointer hover:border-primary/30 transition-colors">
            <Upload className="w-8 h-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium text-foreground">{fileName || "Click to upload"}</p>
            <p className="text-xs text-muted-foreground">PDF or DOC</p>
            <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileChange} />
          </label>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Job Description</CardTitle>
          <CardDescription>Paste the full job description (min. 50 characters)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            rows={8}
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste the job description here..."
          />
          <p className="text-xs text-muted-foreground">{jd.length} characters</p>
        </CardContent>
      </Card>

      <Button className="w-full" size="lg" onClick={handleScan} disabled={jd.length < 50}>
        <ScanSearch className="w-4 h-4" /> Scan Resume
      </Button>
    </div>
  );
}
