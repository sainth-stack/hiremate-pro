import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { CheckCircle, Chrome, Moon, Sun } from "lucide-react";

export default function Settings() {
  const { user } = useAuth();
  const [dark, setDark] = useState(document.documentElement.classList.contains("dark"));
  const [saved, setSaved] = useState(false);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground">Settings</h1>

      {/* Account */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input defaultValue={user?.email || ""} type="email" />
          </div>
          <div className="space-y-2">
            <Label>Current Password</Label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-2">
            <Label>New Password</Label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <Button onClick={handleSave}>
            {saved ? <><CheckCircle className="w-4 h-4" /> Saved!</> : "Save changes"}
          </Button>
        </CardContent>
      </Card>

      {/* Theme */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Appearance</CardTitle>
          <CardDescription>Choose your preferred theme</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {dark ? <Moon className="w-5 h-5 text-muted-foreground" /> : <Sun className="w-5 h-5 text-warning" />}
              <div>
                <p className="text-sm font-medium text-foreground">{dark ? "Dark" : "Light"} mode</p>
                <p className="text-xs text-muted-foreground">Toggle between light and dark theme</p>
              </div>
            </div>
            <Switch checked={dark} onCheckedChange={toggleTheme} />
          </div>
        </CardContent>
      </Card>

      {/* Extension */}
      <Card className="border-primary/20">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Chrome className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Chrome Extension</p>
              <p className="text-xs text-muted-foreground">Autofill applications and sync jobs instantly</p>
            </div>
          </div>
          <Button variant="outline" size="sm">Install</Button>
        </CardContent>
      </Card>
    </div>
  );
}
