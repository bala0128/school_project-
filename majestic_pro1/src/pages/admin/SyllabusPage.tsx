import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const syllabus = [
  { subject: "Mathematics", completed: 72, total: 15 },
  { subject: "Physics", completed: 65, total: 12 },
  { subject: "Chemistry", completed: 80, total: 14 },
  { subject: "Biology", completed: 58, total: 16 },
  { subject: "Tamil", completed: 90, total: 10 },
];

export default function SyllabusPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold flex items-center gap-2"><BookOpen className="w-6 h-6 text-primary" /> Syllabus</h1>
        <p className="text-muted-foreground text-sm mt-1">Track syllabus completion across subjects</p>
      </motion.div>

      <div className="space-y-3">
        {syllabus.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="glass border-border/30">
              <CardContent className="p-4">
                <div className="flex justify-between mb-2">
                  <p className="text-sm font-semibold">{s.subject}</p>
                  <span className="text-xs text-primary font-bold">{s.completed}%</span>
                </div>
                <Progress value={s.completed} className="h-2" />
                <p className="text-[10px] text-muted-foreground mt-1">{s.total} chapters total</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
