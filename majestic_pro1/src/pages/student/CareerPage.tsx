import { motion } from "framer-motion";
import { BarChart3, Target, Lightbulb, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const strengths = [
  { subject: "Mathematics", score: 88 },
  { subject: "Physics", score: 76 },
  { subject: "Chemistry", score: 82 },
  { subject: "Biology", score: 91 },
  { subject: "Tamil", score: 70 },
];

const careerSuggestions = [
  { title: "Medical Sciences", match: 85, icon: "🩺" },
  { title: "Engineering", match: 78, icon: "⚙️" },
  { title: "Data Science", match: 72, icon: "📊" },
];

export default function CareerPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-primary" /> Career Guidance
        </h1>
        <p className="text-muted-foreground text-sm mt-1">AI-powered career recommendations based on your performance</p>
      </motion.div>

      <Card className="glass border-border/30">
        <CardHeader><CardTitle className="text-sm font-display flex items-center gap-2"><TrendingUp className="w-4 h-4 text-primary" /> Subject Strengths</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {strengths.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
              <div className="flex justify-between text-sm mb-1">
                <span>{s.subject}</span>
                <span className="font-bold text-primary">{s.score}%</span>
              </div>
              <Progress value={s.score} className="h-2" />
            </motion.div>
          ))}
        </CardContent>
      </Card>

      <h3 className="font-display font-semibold flex items-center gap-2"><Lightbulb className="w-4 h-4 text-primary" /> Recommended Career Paths</h3>
      <div className="grid sm:grid-cols-3 gap-4">
        {careerSuggestions.map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}
            className="glass rounded-xl p-5 border border-border/30 text-center">
            <div className="text-3xl mb-2">{c.icon}</div>
            <h4 className="font-display font-semibold text-sm">{c.title}</h4>
            <p className="text-xs text-primary font-bold mt-1">{c.match}% Match</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
