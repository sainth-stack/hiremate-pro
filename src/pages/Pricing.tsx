import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard, Sparkles, Shield } from "lucide-react";

const plans = [
  {
    id: "daily",
    name: "Daily",
    price: "₹49",
    period: "/day",
    desc: "Try it out for a day",
    recommended: false,
    features: ["Unlimited resume generation", "AI autofill", "Application tracker", "ATS scanner"],
  },
  {
    id: "weekly",
    name: "Weekly",
    price: "₹199",
    period: "/week",
    desc: "Most popular for active job seekers",
    recommended: true,
    features: ["Everything in Daily", "Resume analyzer", "Interview practice", "Job recommendations", "Priority support"],
  },
  {
    id: "monthly",
    name: "Monthly",
    price: "₹499",
    period: "/month",
    desc: "Best value for serious searchers",
    recommended: false,
    features: ["Everything in Weekly", "Unlimited ATS scans", "Chrome extension access", "Export reports", "Dedicated support"],
  },
];

export default function Pricing() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = (planId: string) => {
    setLoading(planId);
    setTimeout(() => {
      setLoading(null);
      alert("Payment successful! (Mock)");
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-3">
        <Badge className="bg-primary/10 text-primary border-0">
          <Sparkles className="w-3 h-3 mr-1" /> Pricing
        </Badge>
        <h1 className="text-3xl font-bold text-foreground">Simple, transparent pricing</h1>
        <p className="text-muted-foreground text-lg">Every plan unlocks all features. Choose what fits your timeline.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative ${plan.recommended ? "border-primary shadow-lg scale-[1.02]" : ""}`}
          >
            {plan.recommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">Recommended</Badge>
              </div>
            )}
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-lg">{plan.name}</CardTitle>
              <CardDescription>{plan.desc}</CardDescription>
              <div className="pt-3">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="w-4 h-4 text-success shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                variant={plan.recommended ? "default" : "outline"}
                onClick={() => handleSubscribe(plan.id)}
                disabled={loading === plan.id}
              >
                {loading === plan.id ? (
                  "Processing..."
                ) : (
                  <><CreditCard className="w-4 h-4" /> Subscribe</>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center text-sm text-muted-foreground flex items-center justify-center gap-4 flex-wrap">
        <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> Cancel anytime</span>
        <span>•</span>
        <span>No hidden fees</span>
        <span>•</span>
        <span>Instant access</span>
      </div>
    </div>
  );
}
