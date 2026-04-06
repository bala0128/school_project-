import { motion } from "framer-motion";
import { Settings, Bell, Shield, Palette } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold flex items-center gap-2"><Settings className="w-6 h-6 text-primary" /> Settings</h1>
      </motion.div>

      <Card className="glass border-border/30">
        <CardHeader><CardTitle className="text-sm font-display flex items-center gap-2"><Bell className="w-4 h-4 text-primary" /> Notifications</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between"><span className="text-sm">Email notifications</span><Switch /></div>
          <div className="flex items-center justify-between"><span className="text-sm">Push notifications</span><Switch /></div>
          <div className="flex items-center justify-between"><span className="text-sm">SMS alerts</span><Switch /></div>
        </CardContent>
      </Card>

      <Card className="glass border-border/30">
        <CardHeader><CardTitle className="text-sm font-display flex items-center gap-2"><Shield className="w-4 h-4 text-primary" /> Security</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between"><span className="text-sm">Two-factor authentication</span><Switch /></div>
          <div className="flex items-center justify-between"><span className="text-sm">Session timeout (30 min)</span><Switch defaultChecked /></div>
        </CardContent>
      </Card>
    </div>
  );
}
