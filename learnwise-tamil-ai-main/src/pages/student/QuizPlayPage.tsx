import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ChevronRight, ChevronLeft, CheckCircle2, XCircle, Trophy, RotateCcw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const MOCK_QUESTIONS: Record<string, Question[]> = {
  q1: [
    { id: "1", question: "What is the standard form of a quadratic equation?", options: ["ax + b = 0", "ax² + bx + c = 0", "ax³ + bx² + cx + d = 0", "a/x + b = 0"], correctAnswer: 1, explanation: "The standard form of a quadratic equation is ax² + bx + c = 0 where a ≠ 0." },
    { id: "2", question: "What is the discriminant of a quadratic equation?", options: ["b² - 4ac", "b² + 4ac", "2a", "-b/2a"], correctAnswer: 0, explanation: "The discriminant D = b² - 4ac determines the nature of roots." },
    { id: "3", question: "If the discriminant is zero, the equation has:", options: ["Two distinct real roots", "Two equal real roots", "No real roots", "Three roots"], correctAnswer: 1, explanation: "When D = 0, both roots are real and equal." },
    { id: "4", question: "The sum of roots of ax² + bx + c = 0 is:", options: ["c/a", "-b/a", "b/a", "-c/a"], correctAnswer: 1, explanation: "By Vieta's formulas, sum of roots = -b/a." },
    { id: "5", question: "The product of roots of ax² + bx + c = 0 is:", options: ["-b/a", "b/a", "c/a", "-c/a"], correctAnswer: 2, explanation: "By Vieta's formulas, product of roots = c/a." },
    { id: "6", question: "Which method is NOT used to solve quadratic equations?", options: ["Factorization", "Completing the square", "Cross multiplication", "Quadratic formula"], correctAnswer: 2, explanation: "Cross multiplication is used for linear equations, not quadratics." },
    { id: "7", question: "The quadratic formula gives roots as:", options: ["x = -b ± √(b²-4ac) / 2a", "x = b ± √(b²-4ac) / 2a", "x = -b ± √(b²+4ac) / 2a", "x = -b / 2a"], correctAnswer: 0, explanation: "The quadratic formula: x = [-b ± √(b²-4ac)] / 2a" },
    { id: "8", question: "How many roots does a quadratic equation have at most?", options: ["1", "2", "3", "4"], correctAnswer: 1, explanation: "A quadratic equation has at most 2 roots (real or complex)." },
    { id: "9", question: "If a = 1, b = -5, c = 6, find the roots:", options: ["2, 3", "1, 6", "-2, -3", "3, -2"], correctAnswer: 0, explanation: "x² - 5x + 6 = 0 → (x-2)(x-3) = 0 → x = 2, 3" },
    { id: "10", question: "A quadratic equation with D < 0 has:", options: ["Two real roots", "One real root", "No real roots", "Infinite roots"], correctAnswer: 2, explanation: "When D < 0, there are no real roots (roots are complex)." },
  ],
};

// Generate same questions for other quiz IDs
["q2", "q3", "q4", "q5", "q6"].forEach((id) => {
  MOCK_QUESTIONS[id] = MOCK_QUESTIONS.q1;
});

interface QuizPlayPageProps {
  quizId: string;
  onBack: () => void;
}

export default function QuizPlayPage({ quizId, onBack }: QuizPlayPageProps) {
  const questions = MOCK_QUESTIONS[quizId] || MOCK_QUESTIONS.q1;
  const DURATION = questions.length * 90; // 90 seconds per question

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [finished, setFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (finished) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { setFinished(true); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [finished]);

  const selectAnswer = useCallback((optionIndex: number) => {
    if (finished) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[currentQ] = optionIndex;
      return next;
    });
  }, [currentQ, finished]);

  const score = answers.reduce((acc, ans, i) => acc + (ans === questions[i].correctAnswer ? 1 : 0), 0);
  const percentage = Math.round((score / questions.length) * 100);
  const answered = answers.filter((a) => a !== null).length;

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const handleSubmit = () => setFinished(true);
  const handleRetry = () => {
    setAnswers(new Array(questions.length).fill(null));
    setCurrentQ(0);
    setTimeLeft(DURATION);
    setFinished(false);
    setShowExplanation(false);
  };

  if (finished && !showExplanation) {
    return (
      <div className="max-w-lg mx-auto space-y-6">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass rounded-2xl p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-display font-bold mb-1">Quiz Complete!</h2>
          <p className="text-muted-foreground text-sm mb-6">Here's how you did</p>

          <div className="text-5xl font-display font-bold text-gold-gradient mb-2">{percentage}%</div>
          <p className="text-sm text-muted-foreground mb-6">{score} out of {questions.length} correct</p>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-emerald-500/10 rounded-lg p-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
              <p className="text-lg font-bold">{score}</p>
              <p className="text-[10px] text-muted-foreground">Correct</p>
            </div>
            <div className="bg-red-500/10 rounded-lg p-3">
              <XCircle className="w-5 h-5 text-red-400 mx-auto mb-1" />
              <p className="text-lg font-bold">{questions.length - score}</p>
              <p className="text-[10px] text-muted-foreground">Wrong</p>
            </div>
            <div className="bg-primary/10 rounded-lg p-3">
              <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-lg font-bold">{formatTime(DURATION - timeLeft)}</p>
              <p className="text-[10px] text-muted-foreground">Time</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setShowExplanation(true)}>View Answers</Button>
            <Button className="flex-1 bg-gold-gradient hover:opacity-90" onClick={handleRetry}>
              <RotateCcw className="w-4 h-4 mr-1" /> Retry
            </Button>
          </div>
          <Button variant="ghost" className="w-full mt-2" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Quizzes
          </Button>
        </motion.div>
      </div>
    );
  }

  if (showExplanation) {
    return (
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="sm" onClick={onBack}><ArrowLeft className="w-4 h-4 mr-1" /> Back</Button>
          <h2 className="font-display font-bold text-lg">Answer Review</h2>
        </div>
        {questions.map((q, i) => {
          const isCorrect = answers[i] === q.correctAnswer;
          return (
            <motion.div key={q.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-5">
              <div className="flex items-start gap-2 mb-3">
                {isCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5" /> : <XCircle className="w-5 h-5 text-red-400 mt-0.5" />}
                <p className="font-medium text-sm">{i + 1}. {q.question}</p>
              </div>
              <div className="grid grid-cols-1 gap-2 ml-7 mb-3">
                {q.options.map((opt, j) => (
                  <div key={j} className={`text-xs px-3 py-2 rounded-lg border ${
                    j === q.correctAnswer ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300" :
                    j === answers[i] && j !== q.correctAnswer ? "bg-red-500/10 border-red-500/30 text-red-300" :
                    "border-border/20 text-muted-foreground"
                  }`}>
                    {String.fromCharCode(65 + j)}. {opt}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground ml-7 italic">💡 {q.explanation}</p>
            </motion.div>
          );
        })}
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack}><ArrowLeft className="w-4 h-4 mr-1" /> Exit</Button>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-sm font-bold ${
          timeLeft < 60 ? "bg-red-500/15 text-red-400" : "bg-secondary/30 text-foreground"
        }`}>
          <Clock className="w-4 h-4" />
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Question {currentQ + 1} of {questions.length}</span>
          <span>{answered}/{questions.length} answered</span>
        </div>
        <Progress value={((currentQ + 1) / questions.length) * 100} className="h-2" />
      </div>

      {/* Question navigator */}
      <div className="flex gap-1.5 flex-wrap">
        {questions.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentQ(i)}
            className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
              i === currentQ ? "bg-primary text-primary-foreground" :
              answers[i] !== null ? "bg-primary/20 text-primary" :
              "bg-secondary/30 text-muted-foreground"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div key={currentQ} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.2 }} className="glass rounded-xl p-6">
          <p className="font-display font-semibold mb-5">{currentQ + 1}. {q.question}</p>
          <div className="space-y-3">
            {q.options.map((opt, j) => (
              <button
                key={j}
                onClick={() => selectAnswer(j)}
                className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all ${
                  answers[currentQ] === j
                    ? "bg-primary/15 border-primary/40 text-foreground"
                    : "border-border/20 text-muted-foreground hover:border-border/50 hover:text-foreground"
                }`}
              >
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-current/20 text-xs font-bold mr-3">
                  {String.fromCharCode(65 + j)}
                </span>
                {opt}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="outline" disabled={currentQ === 0} onClick={() => setCurrentQ((c) => c - 1)}>
          <ChevronLeft className="w-4 h-4 mr-1" /> Previous
        </Button>
        {currentQ === questions.length - 1 ? (
          <Button className="bg-gold-gradient hover:opacity-90" onClick={handleSubmit}>
            Submit Quiz
          </Button>
        ) : (
          <Button onClick={() => setCurrentQ((c) => c + 1)}>
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
}
