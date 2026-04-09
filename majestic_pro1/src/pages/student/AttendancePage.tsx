import { motion } from "framer-motion";
import { CalendarDays, CheckCircle, XCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const attendanceData = [
  { date: "2026-04-01", status: "present" },
  { date: "2026-04-02", status: "present" },
  { date: "2026-04-03", status: "absent" },
  { date: "2026-04-04", status: "present" },
  { date: "2026-04-05", status: "present" },
];

export default function AttendancePage() {
  const total = attendanceData.length;
  const present = attendanceData.filter(d => d.status === "present").length;
  const percentage = Math.round((present / total) * 100);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold">Attendance</h1>
        <p className="text-muted-foreground text-sm mt-1">Track your daily attendance</p>
      </motion.div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="glass border-border/30">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
            <p className="text-2xl font-bold">{present}</p>
            <p className="text-xs text-muted-foreground">Days Present</p>
          </CardContent>
        </Card>
        <Card className="glass border-border/30">
          <CardContent className="pt-6 text-center">
            <XCircle className="w-8 h-8 text-destructive mx-auto mb-2" />
            <p className="text-2xl font-bold">{total - present}</p>
            <p className="text-xs text-muted-foreground">Days Absent</p>
          </CardContent>
        </Card>
        <Card className="glass border-border/30">
          <CardContent className="pt-6 text-center">
            <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{percentage}%</p>
            <p className="text-xs text-muted-foreground">Attendance Rate</p>
          </CardContent>
        </Card>
      </div>

      <Card className="glass border-border/30">
        <CardHeader>
          <CardTitle className="text-sm font-display flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-primary" /> Recent Attendance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {attendanceData.map((d, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
                <span className="text-sm font-medium">{d.date}</span>
                <span className={`text-xs font-semibold uppercase tracking-wider ${d.status === "present" ? "text-success" : "text-destructive"}`}>
                  {d.status}
                </span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
