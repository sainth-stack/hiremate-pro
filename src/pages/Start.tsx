import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, FileText, Briefcase } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Start() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-2xl w-full space-y-8 animate-fade-in">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Welcome, {user?.name || "there"}! 👋</h1>
          <p className="text-muted-foreground text-lg">Where would you like to start?</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Card className="hover:shadow-md transition-shadow cursor-pointer group" onClick={() => navigate("/job-recommendations")}>
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Get personalized recommendations</CardTitle>
              <CardDescription>Find roles that match your skills and experience</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Explore jobs</Button>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer group border-primary/30" onClick={() => navigate("/resume-generator")}>
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Build resumes & apply faster</CardTitle>
              <CardDescription>Create ATS-optimized resumes with AI assistance</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                <Sparkles className="w-4 h-4" /> Get started
              </Button>
            </CardContent>
          </Card>
        </div>
        <p className="text-center">
          <Button variant="link" onClick={() => navigate("/")} className="text-muted-foreground">
            Skip to dashboard →
          </Button>
        </p>
      </div>
    </div>
  );
}
