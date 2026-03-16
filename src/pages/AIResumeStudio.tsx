import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import resumeGenImg from "@/assets/resume-generator-illustration.png";
import atsScannerImg from "@/assets/ats-scanner-illustration.png";
import resumeScanImg from "@/assets/resume-scan-illustration.png";

const tools = [
  {
    title: "RESUME GENERATOR",
    heading: "Build a Professional Resume in Minutes",
    desc: "Create a job-winning resume tailored to your experience and target role using AI",
    image: resumeGenImg,
    path: "/resume-generator",
    accent: false,
  },
  {
    title: "ATS SCANNER",
    heading: "No More ATS Resume Rejections",
    desc: "Ensure an ATS Score of more than 80% and get more interview calls",
    image: atsScannerImg,
    path: "/job-scan",
    accent: true,
  },
  {
    title: "RESUME SCAN",
    heading: "Get Deep Insights on Your Resume",
    desc: "Analyze strengths, gaps and keyword matches between your resume and the job description",
    image: resumeScanImg,
    path: "/resume-analyzer",
    accent: false,
  },
];

export default function AIResumeStudio() {
  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-3 pt-4">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Accelerate Your Path to Employment
        </h1>
        <p className="text-muted-foreground text-lg">
          Sign up and start{" "}
          <span className="text-primary font-medium border-b-2 border-primary pb-0.5">enhancing</span>{" "}
          your job search experience now
        </p>
      </div>

      {/* Tool Cards */}
      <div className="grid md:grid-cols-3 gap-6 px-2">
        {tools.map((tool, i) => (
          <Link key={tool.title} to={tool.path} className="group">
            <Card
              className="h-full border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <CardContent className="p-6 flex flex-col h-full">
                {/* Label */}
                <p className={`text-xs font-bold tracking-widest uppercase mb-4 ${
                  tool.accent ? "text-primary" : "text-foreground"
                }`}>
                  {tool.title}
                </p>

                {/* Illustration */}
                <div className="flex justify-center items-center py-4 mb-4">
                  <img
                    src={tool.image}
                    alt={tool.heading}
                    className="w-40 h-40 object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Text */}
                <h3 className="text-lg font-bold text-foreground mb-2 leading-snug">
                  {tool.heading}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tool.desc}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
