import { useCountUp } from "@/hooks/useCountUp";
import { TokenResult } from "@/lib/tokenizer";
import { getModel } from "@/lib/models";
import { Progress } from "@/components/ui/progress";

interface StatsStripProps {
  result: TokenResult | null;
  modelId: string;
}

const StatsStrip = ({ result, modelId }: StatsStripProps) => {
  const model = getModel(modelId);
  const totalTokens = result?.totalTokens ?? 0;
  const uniqueTokens = result ? new Set(result.tokens.map(t => t.id)).size : 0;
  const avgLength = result && result.tokens.length > 0
    ? result.tokens.reduce((sum, t) => sum + t.text.length, 0) / result.tokens.length
    : 0;

  const animTotal = useCountUp(totalTokens);
  const animUnique = useCountUp(uniqueTokens);
  const animAvg = useCountUp(Math.round(avgLength * 10));

  const contextWindow = model?.contextWindow ?? 128000;
  const usagePercent = Math.min((totalTokens / contextWindow) * 100, 100);

  const getProgressColor = () => {
    if (usagePercent > 80) return "bg-destructive";
    if (usagePercent > 50) return "bg-warning";
    return "bg-success";
  };

  const stats = [
    { value: animTotal, label: "tokens in prompt" },
    { value: animUnique, label: "unique tokens" },
    { value: (animAvg / 10).toFixed(1), label: "avg chars / token" },
  ];

  return (
    <section className="mx-auto max-w-content px-6 py-12">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat, i) => (
          <div key={i} className="rounded-card border border-border bg-card p-6 text-center">
            <div className="font-mono text-4xl font-normal text-foreground animate-count-up">
              {stat.value}
            </div>
            <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Context window usage */}
      {totalTokens > 0 && model && (
        <div className="mt-4 rounded-card border border-border bg-card p-4">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Context Window Usage</span>
            <span className="font-mono text-foreground">
              {totalTokens.toLocaleString()} / {contextWindow.toLocaleString()} tokens
            </span>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className={`h-full rounded-full transition-all duration-500 ${getProgressColor()}`}
              style={{ width: `${Math.max(usagePercent, 0.5)}%` }}
            />
          </div>
          <div className="mt-1 text-right text-[10px] font-mono text-muted-foreground">
            {usagePercent.toFixed(2)}%
          </div>
        </div>
      )}
    </section>
  );
};

export default StatsStrip;
