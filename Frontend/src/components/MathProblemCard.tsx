import { useState } from "react";
import { Button } from "./ui/button";
import { Calculator, Eye, EyeOff } from "lucide-react";

interface MathProblemCardProps {
  problem: string;
  answer: string;
  explanation: string;
}

export const MathProblemCard = ({ problem, answer, explanation }: MathProblemCardProps) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="glass-card rounded-2xl p-6 shadow-[var(--shadow-card)] animate-slide-up bg-gradient-to-br from-primary/5 to-accent/5">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Calculator className="h-5 w-5 text-primary" />
        Math Challenge
      </h3>
      <div className="space-y-4">
        <div className="p-4 bg-card rounded-lg">
          <p className="text-base font-medium whitespace-pre-wrap">{problem}</p>
        </div>
        
        <Button
          onClick={() => setShowAnswer(!showAnswer)}
          variant="outline"
          className="w-full"
        >
          {showAnswer ? (
            <>
              <EyeOff className="mr-2 h-4 w-4" />
              Hide Solution
            </>
          ) : (
            <>
              <Eye className="mr-2 h-4 w-4" />
              Show Solution
            </>
          )}
        </Button>

        {showAnswer && (
          <div className="space-y-3 animate-fade-in">
            <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
              <p className="text-sm font-semibold text-success mb-1">Answer:</p>
              <p className="text-base font-medium">{answer}</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-semibold mb-1">Explanation:</p>
              <p className="text-base leading-relaxed">{explanation}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
