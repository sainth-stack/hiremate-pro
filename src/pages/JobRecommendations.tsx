import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, ExternalLink, Sparkles } from "lucide-react";

const mockJobs = [
  { id: "1", title: "Senior Frontend Engineer", company: "Google", location: "Bengaluru", match: 92, tags: ["React", "TypeScript"] },
  { id: "2", title: "Full Stack Developer", company: "Razorpay", location: "Bengaluru", match: 87, tags: ["Node.js", "React"] },
  { id: "3", title: "Software Engineer II", company: "Microsoft", location: "Hyderabad", match: 84, tags: ["TypeScript", "Azure"] },
  { id: "4", title: "Frontend Developer", company: "Swiggy", location: "Bengaluru", match: 79, tags: ["React", "Next.js"] },
  { id: "5", title: "Product Engineer", company: "Zerodha", location: "Bengaluru", match: 76, tags: ["Go", "React"] },
];

export default function JobRecommendations() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Sparkles className="w-4 h-4" /> Based on your profile
        </div>
        <h1 className="text-2xl font-bold text-foreground">Job Recommendations</h1>
        <p className="text-muted-foreground">Roles that match your skills and experience</p>
      </div>

      <div className="space-y-3">
        {mockJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground shrink-0">
                  {job.company.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-foreground truncate">{job.title}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    {job.company} · <MapPin className="w-3 h-3" /> {job.location}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {job.tags.map((t) => <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">{job.match}%</p>
                  <p className="text-[10px] text-muted-foreground">match</p>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-3.5 h-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
