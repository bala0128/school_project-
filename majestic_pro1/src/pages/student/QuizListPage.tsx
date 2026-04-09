import { useState } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Clock, BookOpen, Trophy, Search, ChevronRight, Target } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Quiz {
  id: string;
  title: string;
  subject: string;
  topic: string;
  questions: number;
  duration: number;
  difficulty: "Easy" | "Medium" | "Hard";
  bestScore?: number;
  attempts: number;
}

const MOCK_QUIZZES: Quiz[] = [
  { id: "q1", title: "Quadratic Equations", subject: "Maths", topic: "Algebra", questions: 10, duration: 15, difficulty: "Medium", bestScore: 80, attempts: 2 },
  { id: "q2", title: "Newton's Laws", subject: "Science", topic: "Physics", questions: 10, duration: 15, difficulty: "Easy", bestScore: 90, attempts: 1 },
  { id: "q3", title: "Parts of Speech", subject: "English", topic: "Grammar", questions: 10, duration: 10, difficulty: "Easy", attempts: 0 },
  { id: "q4", title: "Bernoulli's Theorem", subject: "Science", topic: "Physics", questions: 10, duration: 20, difficulty: "Hard", attempts: 0 },
  { id: "q5", title: "Trigonometry Basics", subject: "Maths", topic: "Trigonometry", questions: 10, duration: 15, difficulty: "Medium", bestScore: 70, attempts: 3 },
  { id: "q6", title: "Chemical Bonding", subject: "Science", topic: "Chemistry", questions: 10, duration: 15, difficulty: "Medium", attempts: 0 },
];

const difficultyColor = {
  Easy: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  Medium: "bg-primary/15 text-primary border-primary/20",
  Hard: "bg-red-500/15 text-red-400 border-red-500/20",
};

interface QuizListPageProps {
  onStartQuiz: (quizId: string) => void;
}

export default function QuizListPage({ onStartQuiz }: QuizListPageProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const subjects = ["All", ...new Set(MOCK_QUIZZES.map((q) => q.subject))];
  const filtered = MOCK_QUIZZES.filter(
    (q) =>
      (filter === "All" || q.subject === filter) &&
      (q.title.toLowerCase().includes(search.toLowerCase()) || q.topic.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-display font-bold">
          <span className="text-gold-gradient">Quiz</span> Arena
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Test your knowledge and climb the leaderboard</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: BrainCircuit, label: "Quizzes Taken", value: "6" },
          { icon: Trophy, label: "Best Streak", value: "5" },
          { icon: Target, label: "Avg Score", value: "82%" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }} className="glass rounded-xl p-4 text-center">
            <s.icon className="w-5 h-5 text-primary mx-auto mb-1" />
            <p className="text-lg font-bold font-display">{s.value}</p>
            <p className="text-[10px] text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search quizzes..." className="pl-9 bg-secondary/30 border-border/30" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2">
          {subjects.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === s ? "bg-primary text-primary-foreground" : "bg-secondary/30 text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Quiz List */}
      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map((quiz, i) => (
          <motion.div
            key={quiz.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.05 }}
            className="glass rounded-xl p-5 hover:border-primary/30 border border-transparent transition-all cursor-pointer group"
            onClick={() => onStartQuiz(quiz.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-display font-semibold text-sm">{quiz.title}</h3>
                <p className="text-xs text-muted-foreground">{quiz.subject} • {quiz.topic}</p>
              </div>
              <Badge variant="outline" className={difficultyColor[quiz.difficulty]}>{quiz.difficulty}</Badge>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
              <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{quiz.questions} Qs</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{quiz.duration} min</span>
            </div>
            <div className="flex items-center justify-between">
              {quiz.bestScore !== undefined ? (
                <span className="text-xs"><span className="text-primary font-semibold">{quiz.bestScore}%</span> best score • {quiz.attempts} attempts</span>
              ) : (
                <span className="text-xs text-muted-foreground">Not attempted yet</span>
              )}
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
