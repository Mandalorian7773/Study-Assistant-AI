import { Lightbulb } from "lucide-react";

interface StudyTipCardProps {
  tip: string;
}

export const StudyTipCard = ({ tip }: StudyTipCardProps) => {
  return (
    <div className="glass-card rounded-2xl p-6 shadow-[var(--shadow-card)] animate-slide-up bg-gradient-to-br from-accent/5 to-primary/5">
      <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-accent" />
        Study Tip
      </h3>
      <p className="text-base leading-relaxed">{tip}</p>
    </div>
  );
};
