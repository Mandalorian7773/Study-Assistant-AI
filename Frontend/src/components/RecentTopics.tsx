import { Clock, X } from "lucide-react";
import { Button } from "./ui/button";

interface RecentTopicsProps {
  topics: string[];
  onTopicClick: (topic: string) => void;
  onClearHistory: () => void;
}

export const RecentTopics = ({ topics, onTopicClick, onClearHistory }: RecentTopicsProps) => {
  if (topics.length === 0) return null;

  return (
    <div className="glass-card rounded-2xl p-6 shadow-[var(--shadow-card)] animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Recent Topics
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearHistory}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onTopicClick(topic)}
            className="hover:bg-primary/10 hover:border-primary hover:text-primary transition-all"
          >
            {topic}
          </Button>
        ))}
      </div>
    </div>
  );
};
