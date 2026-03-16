import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ScanSearch, FileBarChart, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const tools = [
  {
    title: "Resume Generator",
    desc: "Build a professional, ATS-optimized resume in minutes using AI and your profile data.",
    icon: FileText,
    path: "/resume-generator",
    cta: "Build Resume",
    featured: true,
  },
  {
    title: "ATS Scanner",
    desc: "Upload your resume and paste a job description to get an ATS compatibility score and suggestions.",
    icon: ScanSearch,
    path: "/job-scan",
    cta: "Scan Resume",
    featured: false,
  },
  {
    title: "Resume Analyzer",
    desc: "Get deep insights into your resume — strengths, gaps, and keyword analysis vs any job description.",
    icon: FileBarChart,
    path: "/resume-analyzer",
    cta: "Analyze Resume",
    featured: false,
  },
];

export default function AIResumeStudio() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Sparkles className="w-4 h-4" /> AI-Powered
        </div>
        <h1 className="text-3xl font-bold text-foreground">AI Resume Studio</h1>
        <p className="text-muted-foreground text-lg max-w-lg mx-auto">
          Accelerate your path to employment with AI tools designed to get you hired faster.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Card
            key={tool.title}
            className={`group hover:shadow-lg transition-all ${tool.featured ? "border-primary/30 shadow-md" : ""}`}
          >
            {tool.featured && (
              <div className="bg-primary text-primary-foreground text-xs font-medium text-center py-1.5 rounded-t-lg">
                Most Popular
              </div>
            )}
            <CardHeader className="text-center">
              <div className={`mx-auto w-14 h-14 rounded-2xl flex items-center justify-center mb-3 ${tool.featured ? "bg-primary/10" : "bg-muted"} group-hover:scale-110 transition-transform`}>
                <tool.icon className={`w-7 h-7 ${tool.featured ? "text-primary" : "text-muted-foreground"}`} />
              </div>
              <CardTitle className="text-lg">{tool.title}</CardTitle>
              <CardDescription className="text-sm">{tool.desc}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Link to={tool.path}>
                <Button className="w-full" variant={tool.featured ? "default" : "outline"}>
                  {tool.cta} <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
