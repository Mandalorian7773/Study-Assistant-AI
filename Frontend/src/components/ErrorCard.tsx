import { AlertCircle } from "lucide-react";
import { Button } from "./ui/button";

interface ErrorCardProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorCard = ({ message, onRetry }: ErrorCardProps) => {
  return (
    <div className="glass-card rounded-2xl p-6 shadow-[var(--shadow-card)] animate-slide-up bg-destructive/5 border-destructive/20">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-2">Oops! Something went wrong</h3>
          <p className="text-base text-muted-foreground mb-4">{message}</p>
          {onRetry && (
            <Button onClick={onRetry} variant="outline" size="sm">
              Try Again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
