import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Briefcase, GraduationCap, FolderKanban, Code, Link2, Settings, CheckCircle, Plus, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const initialSkills = ["React", "TypeScript", "Node.js", "Python", "PostgreSQL", "AWS", "Docker", "Git", "GraphQL", "Tailwind CSS"];

const initialExperience = [
  { id: "1", company: "TechCorp", role: "Senior Frontend Engineer", from: "2022-01", to: "Present", desc: "Led React migration. Built design system used by 40+ engineers." },
  { id: "2", company: "StartupXYZ", role: "Full Stack Developer", from: "2020-03", to: "2022-01", desc: "Built product from 0 to 10k users. Node.js + React." },
];

const initialEducation = [
  { id: "1", school: "IIT Delhi", degree: "B.Tech Computer Science", year: "2020", gpa: "8.7/10" },
];

const initialProjects = [
  { id: "1", name: "DevTracker", desc: "GitHub contribution tracker with analytics dashboard", tech: "React, D3, Firebase", link: "https://github.com/user/devtracker" },
  { id: "2", name: "SmartNotes", desc: "AI-powered note-taking app with semantic search", tech: "Next.js, OpenAI, Supabase", link: "https://github.com/user/smartnotes" },
];

export default function Profile() {
  const { user } = useAuth();
  const [skills, setSkills] = useState(initialSkills);
  const [newSkill, setNewSkill] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground">Your data hub — used for resume building and autofill</p>
        </div>
        <Button onClick={handleSave}>
          {saved ? <><CheckCircle className="w-4 h-4" /> Saved!</> : "Save changes"}
        </Button>
      </div>

      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList className="flex-wrap h-auto gap-1">
          <TabsTrigger value="basic"><User className="w-3.5 h-3.5 mr-1.5" />Basic</TabsTrigger>
          <TabsTrigger value="experience"><Briefcase className="w-3.5 h-3.5 mr-1.5" />Experience</TabsTrigger>
          <TabsTrigger value="education"><GraduationCap className="w-3.5 h-3.5 mr-1.5" />Education</TabsTrigger>
          <TabsTrigger value="projects"><FolderKanban className="w-3.5 h-3.5 mr-1.5" />Projects</TabsTrigger>
          <TabsTrigger value="skills"><Code className="w-3.5 h-3.5 mr-1.5" />Skills</TabsTrigger>
          <TabsTrigger value="links"><Link2 className="w-3.5 h-3.5 mr-1.5" />Links</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <Card>
            <CardHeader><CardTitle className="text-base">Basic Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input defaultValue={user?.name || ""} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue={user?.email || ""} type="email" />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input defaultValue="+91 98765 43210" />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input defaultValue="Bengaluru, India" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Professional Headline</Label>
                <Input defaultValue="Senior Frontend Engineer | React & TypeScript" />
              </div>
              <div className="space-y-2">
                <Label>Summary</Label>
                <Textarea
                  rows={4}
                  defaultValue="Passionate software engineer with 4+ years building scalable web applications. Focused on React, TypeScript, and modern frontend architecture."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Experience</CardTitle>
              <Button variant="outline" size="sm"><Plus className="w-3.5 h-3.5 mr-1" /> Add</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {initialExperience.map((exp) => (
                <div key={exp.id} className="p-4 rounded-lg border border-border space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-foreground">{exp.role}</p>
                      <p className="text-sm text-muted-foreground">{exp.company} · {exp.from} – {exp.to}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><Settings className="w-3.5 h-3.5" /></Button>
                  </div>
                  <p className="text-sm text-muted-foreground">{exp.desc}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Education</CardTitle>
              <Button variant="outline" size="sm"><Plus className="w-3.5 h-3.5 mr-1" /> Add</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {initialEducation.map((edu) => (
                <div key={edu.id} className="p-4 rounded-lg border border-border">
                  <p className="font-medium text-foreground">{edu.degree}</p>
                  <p className="text-sm text-muted-foreground">{edu.school} · {edu.year} · GPA: {edu.gpa}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Projects</CardTitle>
              <Button variant="outline" size="sm"><Plus className="w-3.5 h-3.5 mr-1" /> Add</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {initialProjects.map((p) => (
                <div key={p.id} className="p-4 rounded-lg border border-border space-y-1">
                  <p className="font-medium text-foreground">{p.name}</p>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                  <p className="text-xs text-muted-foreground">{p.tech}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills">
          <Card>
            <CardHeader><CardTitle className="text-base">Skills</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <Badge key={s} variant="secondary" className="text-sm gap-1 pl-3">
                    {s}
                    <button onClick={() => setSkills(skills.filter((sk) => sk !== s))} className="ml-1 hover:text-destructive">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addSkill()}
                  className="max-w-[200px]"
                />
                <Button variant="outline" size="sm" onClick={addSkill}>Add</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="links">
          <Card>
            <CardHeader><CardTitle className="text-base">Links</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>LinkedIn</Label>
                  <Input defaultValue="https://linkedin.com/in/alexjohnson" />
                </div>
                <div className="space-y-2">
                  <Label>GitHub</Label>
                  <Input defaultValue="https://github.com/alexjohnson" />
                </div>
                <div className="space-y-2">
                  <Label>Portfolio</Label>
                  <Input defaultValue="https://alexjohnson.dev" />
                </div>
                <div className="space-y-2">
                  <Label>Other</Label>
                  <Input placeholder="https://..." />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
