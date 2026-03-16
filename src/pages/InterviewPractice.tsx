import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic, Plus, ArrowRight, MessageSquare } from "lucide-react";

const mockInterviews = [
  { id: "1", role: "Frontend Engineer", company: "Google", questions: 12, date: "Mar 14" },
  { id: "2", role: "Full Stack Dev", company: "Stripe", questions: 8, date: "Mar 10" },
];

const mockQuestions = [
  { q: "Explain the virtual DOM and how React uses it.", done: true },
  { q: "How would you optimize a slow React application?", done: true },
  { q: "Describe the difference between useMemo and useCallback.", done: false },
  { q: "How do you handle state management in large applications?", done: false },
  { q: "Walk me through how you'd design a component library.", done: false },
  { q: "Tell me about a challenging bug you fixed recently.", done: false },
];

export default function InterviewPractice() {
  const [selected, setSelected] = useState<string | null>(null);

  if (selected) {
    const interview = mockInterviews.find((i) => i.id === selected);
    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
        <Button variant="ghost" onClick={() => setSelected(null)}>← Back to interviews</Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{interview?.role} — {interview?.company}</h1>
          <p className="text-muted-foreground">Practice questions generated for this role</p>
        </div>
        <div className="space-y-3">
          {mockQuestions.map((q, i) => (
            <Card key={i} className={q.done ? "opacity-60" : ""}>
              <CardContent className="p-4 flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${q.done ? "border-success bg-success/10" : "border-border"}`}>
                  {q.done && <span className="text-success text-xs">✓</span>}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{q.q}</p>
                </div>
                <Badge variant="secondary" className="text-xs shrink-0">{q.done ? "Done" : "Pending"}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Interview Practice</h1>
          <p className="text-muted-foreground">Prepare for interviews with AI-generated questions</p>
        </div>
        <Button><Plus className="w-4 h-4" /> New Interview</Button>
      </div>

      {mockInterviews.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Mic className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-lg font-medium text-foreground mb-2">No interviews yet</p>
            <p className="text-muted-foreground mb-4">Create a practice session to get started</p>
            <Button><Plus className="w-4 h-4" /> New Interview</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {mockInterviews.map((interview) => (
            <Card key={interview.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelected(interview.id)}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{interview.role}</p>
                    <p className="text-sm text-muted-foreground">{interview.company} · {interview.questions} questions · {interview.date}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
