import { motion } from "framer-motion";
import { ClipboardList, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const quizzes = [
  { title: "Math – Quadratic Equations", subject: "Mathematics", class: "10-A", questions: 10, active: true },
  { title: "Physics – Motion Laws", subject: "Physics", class: "9-A", questions: 8, active: true },
  { title: "Chemistry – Periodic Table", subject: "Chemistry", class: "10-B", questions: 12, active: false },
];

export default function QuizManagePage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-primary" /> Quiz Management
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Create and manage quizzes</p>
        </div>
        <Button size="sm"><Plus className="w-4 h-4 mr-1" /> New Quiz</Button>
      </motion.div>

      <div className="space-y-3">
        {quizzes.map((q, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="glass border-border/30">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold">{q.title}</h3>
                  <p className="text-xs text-muted-foreground">{q.subject} • {q.class} • {q.questions} questions</p>
                </div>
                <Badge variant={q.active ? "default" : "secondary"}>{q.active ? "Active" : "Draft"}</Badge>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
