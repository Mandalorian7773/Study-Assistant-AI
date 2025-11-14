import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Loader2, Sparkles } from "lucide-react";

interface TopicInputProps {
  onSubmit: (topic: string, mathMode: boolean) => void;
  isLoading: boolean;
}

export const TopicInput = ({ onSubmit, isLoading }: TopicInputProps) => {
  const [topic, setTopic] = useState("");
  const [mathMode, setMathMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onSubmit(topic.trim(), mathMode);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <div className="glass-card rounded-2xl p-8 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            What would you like to learn?
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="topic" className="text-base">Topic</Label>
            <Input
              id="topic"
              type="text"
              placeholder="e.g., Photosynthesis, World War II, Calculus..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={isLoading}
              className="h-12 text-base"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
            <div className="space-y-0.5">
              <Label htmlFor="math-mode" className="text-base font-medium">
                Math Mode
              </Label>
              <p className="text-sm text-muted-foreground">
                Generate quantitative problems and logical challenges
              </p>
            </div>
            <Switch
              id="math-mode"
              checked={mathMode}
              onCheckedChange={setMathMode}
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading || !topic.trim()}
            className="w-full h-12 text-base font-semibold"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Study Material"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};
