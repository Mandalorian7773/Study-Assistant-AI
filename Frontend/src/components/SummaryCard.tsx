import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface SummaryCardProps {
  points: string[];
}

export const SummaryCard = ({ points }: SummaryCardProps) => {
  const [visiblePoints, setVisiblePoints] = useState<number>(0);

  useEffect(() => {
    points.forEach((_, index) => {
      setTimeout(() => {
        setVisiblePoints(index + 1);
      }, index * 200);
    });
  }, [points]);

  return (
    <div className="glass-card rounded-2xl p-6 shadow-[var(--shadow-card)] animate-slide-up">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <CheckCircle className="h-5 w-5 text-primary" />
        Summary
      </h3>
      <ul className="space-y-3">
        {points.map((point, index) => (
          <li
            key={index}
            className={`flex items-start gap-3 transition-all duration-300 ${
              index < visiblePoints
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-4"
            }`}
          >
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold mt-0.5">
              {index + 1}
            </span>
            <span className="text-base leading-relaxed">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
