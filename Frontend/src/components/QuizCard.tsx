import { useState } from "react";
import { Button } from "./ui/button";
import { HelpCircle, CheckCircle2, XCircle } from "lucide-react";

interface QuizQuestion {
  question: string;
  options: { label: string; text: string }[];
  correct: string;
}

interface QuizCardProps {
  questions: QuizQuestion[];
}

export const QuizCard = ({ questions }: QuizCardProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
    setRevealedAnswers((prev) => ({ ...prev, [questionIndex]: true }));
  };

  const isCorrect = (questionIndex: number, answer: string) => {
    return questions[questionIndex].correct === answer;
  };

  return (
    <div className="glass-card rounded-2xl p-6 shadow-[var(--shadow-card)] animate-slide-up">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <HelpCircle className="h-5 w-5 text-accent" />
        Quick Quiz
      </h3>
      <div className="space-y-6">
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="space-y-3">
            <p className="font-semibold text-base">
              {qIndex + 1}. {q.question}
            </p>
            <div className="grid gap-2">
              {q.options.map((option) => {
                const isSelected = selectedAnswers[qIndex] === option.label;
                const isRevealed = revealedAnswers[qIndex];
                const correct = isCorrect(qIndex, option.label);

                return (
                  <Button
                    key={option.label}
                    variant="outline"
                    className={`justify-start h-auto py-3 px-4 text-left transition-all ${
                      isRevealed
                        ? isSelected
                          ? correct
                            ? "bg-success/10 border-success text-success-foreground"
                            : "bg-destructive/10 border-destructive text-destructive-foreground"
                          : correct
                          ? "bg-success/10 border-success text-success-foreground"
                          : ""
                        : "hover:bg-accent/10"
                    }`}
                    onClick={() => handleAnswerSelect(qIndex, option.label)}
                    disabled={isRevealed}
                  >
                    <span className="font-semibold mr-2">{option.label}.</span>
                    <span className="flex-1">{option.text}</span>
                    {isRevealed && correct && (
                      <CheckCircle2 className="ml-2 h-5 w-5 text-success" />
                    )}
                    {isRevealed && isSelected && !correct && (
                      <XCircle className="ml-2 h-5 w-5 text-destructive" />
                    )}
                  </Button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
