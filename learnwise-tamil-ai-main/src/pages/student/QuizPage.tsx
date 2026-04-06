import { useState } from "react";
import QuizListPage from "./QuizListPage";
import QuizPlayPage from "./QuizPlayPage";

export default function QuizPage() {
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);

  if (activeQuiz) {
    return <QuizPlayPage quizId={activeQuiz} onBack={() => setActiveQuiz(null)} />;
  }

  return <QuizListPage onStartQuiz={(id) => setActiveQuiz(id)} />;
}
