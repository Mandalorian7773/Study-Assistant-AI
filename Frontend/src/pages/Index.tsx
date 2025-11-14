import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TopicInput } from "@/components/TopicInput";
import { SummaryCard } from "@/components/SummaryCard";
import { QuizCard } from "@/components/QuizCard";
import { StudyTipCard } from "@/components/StudyTipCard";
import { MathProblemCard } from "@/components/MathProblemCard";
import { RecentTopics } from "@/components/RecentTopics";
import { ErrorCard } from "@/components/ErrorCard";
import { EmptyState } from "@/components/EmptyState";
import { useToast } from "@/hooks/use-toast";

interface StudyResponse {
  summary: string[];
  quiz: Array<{
    question: string;
    options: { label: string; text: string }[];
    correct: string;
  }>;
  studyTip: string;
  mathProblem?: {
    problem: string;
    answer: string;
    explanation: string;
  };
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [studyData, setStudyData] = useState<StudyResponse | null>(null);
  const [recentTopics, setRecentTopics] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem("recentTopics");
    if (saved) {
      setRecentTopics(JSON.parse(saved));
    }
  }, []);

  const saveRecentTopic = (topic: string) => {
    const updated = [topic, ...recentTopics.filter((t) => t !== topic)].slice(0, 5);
    setRecentTopics(updated);
    localStorage.setItem("recentTopics", JSON.stringify(updated));
  };

  const handleClearHistory = () => {
    setRecentTopics([]);
    localStorage.removeItem("recentTopics");
    toast({ title: "History cleared" });
  };

  const handleSubmit = async (topic: string, mathMode: boolean) => {
    // Clear previous results
    setStudyData(null);
    setError(null);
    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      
      if (!apiUrl) {
        throw new Error("API URL not configured. Please set VITE_API_URL in your .env file");
      }

      const mode = mathMode ? "math" : "normal";
      const response = await fetch(
        `${apiUrl}/study?topic=${encodeURIComponent(topic)}&mode=${mode}`,
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch study material (Status: ${response.status})`);
      }

      const data = await response.json();

      // Check if API returned an error
      if (data.error) {
        let errorMessage = data.error;
        // Provide more helpful error messages for common issues
        if (errorMessage.includes("Topic not found")) {
          errorMessage = `We couldn't find information about "${topic}". Try a different topic or check your spelling.`;
        } else if (errorMessage.includes("Gemini API")) {
          errorMessage = "The AI service is temporarily unavailable. Please try again in a few minutes.";
        }
        throw new Error(errorMessage);
      }

      setStudyData(data);
      saveRecentTopic(topic);
      toast({ 
        title: "Study material generated!", 
        description: `Ready to learn about ${topic}` 
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <ThemeToggle />
      
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-2 animate-fade-in pt-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Smart Study Assistant
          </h1>
          <p className="text-lg text-muted-foreground">
            AI-powered learning companion for smarter studying
          </p>
        </header>

        {/* Input Section */}
        <TopicInput onSubmit={handleSubmit} isLoading={isLoading} />

        {/* Recent Topics */}
        {recentTopics.length > 0 && (
          <div className="max-w-2xl mx-auto">
            <RecentTopics
              topics={recentTopics}
              onTopicClick={(topic) => handleSubmit(topic, false)}
              onClearHistory={handleClearHistory}
            />
          </div>
        )}

        {/* Results Section */}
        <div className="max-w-4xl mx-auto">
          {error && !studyData && (
            <ErrorCard
              message={error}
              onRetry={() => window.location.reload()}
            />
          )}

          {!isLoading && !studyData && !error && <EmptyState />}

          {studyData && (
            <div className="grid gap-6">
              <SummaryCard points={studyData.summary} />
              <QuizCard questions={studyData.quiz} />
              <StudyTipCard tip={studyData.studyTip} />
              {studyData.mathProblem && (
                <MathProblemCard
                  problem={studyData.mathProblem.problem}
                  answer={studyData.mathProblem.answer}
                  explanation={studyData.mathProblem.explanation}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;