import { BookOpen, Sparkles } from "lucide-react";

export const EmptyState = () => {
  return (
    <div className="text-center py-12 animate-fade-in">
      <div className="relative inline-block mb-6">
        <BookOpen className="h-20 w-20 text-primary/30" />
        <Sparkles className="h-8 w-8 text-accent absolute -top-2 -right-2 animate-pulse" />
      </div>
      <h3 className="text-2xl font-bold mb-2">Ready to Learn?</h3>
      <p className="text-muted-foreground text-lg max-w-md mx-auto">
        Enter a topic above to get personalized summaries, quizzes, and study tips
      </p>
    </div>
  );
};
