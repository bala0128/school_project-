import { motion } from "framer-motion";
import { CalendarDays, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const students = [
  { id: "1", name: "Priya S.", roll: "001" },
  { id: "2", name: "Arjun K.", roll: "002" },
  { id: "3", name: "Meena R.", roll: "003" },
  { id: "4", name: "Karthik V.", roll: "004" },
  { id: "5", name: "Deepa L.", roll: "005" },
];

export default function AttendanceEntryPage() {
  const [attendance, setAttendance] = useState<Record<string, string>>({});

  const toggle = (id: string) => {
    setAttendance(prev => ({ ...prev, [id]: prev[id] === "present" ? "absent" : "present" }));
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold flex items-center gap-2">
          <CalendarDays className="w-6 h-6 text-primary" /> Attendance Entry
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Mark today's attendance</p>
      </motion.div>

      <Card className="glass border-border/30">
        <CardHeader><CardTitle className="text-sm font-display">Class 10-A • {new Date().toLocaleDateString()}</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {students.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
              <div>
                <p className="text-sm font-medium">{s.name}</p>
                <p className="text-xs text-muted-foreground">Roll: {s.roll}</p>
              </div>
              <Button size="sm" variant={attendance[s.id] === "present" ? "default" : attendance[s.id] === "absent" ? "destructive" : "outline"} onClick={() => toggle(s.id)}>
                {attendance[s.id] === "present" ? <Check className="w-4 h-4" /> : attendance[s.id] === "absent" ? <X className="w-4 h-4" /> : "Mark"}
              </Button>
            </motion.div>
          ))}
          <Button className="w-full mt-4">Submit Attendance</Button>
        </CardContent>
      </Card>
    </div>
  );
}
