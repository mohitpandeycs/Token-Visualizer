import { useState } from "react";
import { getModel } from "@/lib/models";
import { TokenResult } from "@/lib/tokenizer";

interface CostEstimatorProps {
  result: TokenResult | null;
  modelId: string;
}

const CostEstimator = ({ result, modelId }: CostEstimatorProps) => {
  const [outputTokens, setOutputTokens] = useState(500);
  const model = getModel(modelId);

  if (!model) return null;

  const inputTokens = result?.totalTokens ?? 0;
  const inputCost = (inputTokens / 1_000_000) * model.inputCostPer1M;
  const outputCost = (outputTokens / 1_000_000) * model.outputCostPer1M;
  const totalCost = inputCost + outputCost;

  return (
    <section className="mx-auto max-w-content px-6 py-12">
      <h2 className="font-display text-2xl text-foreground md:text-[28px]">What Will This Cost?</h2>
      <p className="mb-6 mt-2 text-sm text-muted-foreground">
        Based on <span className="font-bold text-foreground">{model.name}</span> pricing. Always verify with the provider.
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Input cost */}
        <div className="rounded-card border border-border bg-card p-6">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Input Cost</div>
          <div className="mt-2 font-mono text-2xl text-foreground">
            ${inputCost.toFixed(6)}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            {inputTokens.toLocaleString()} tokens × ${model.inputCostPer1M}/1M
          </div>
        </div>

        {/* Output cost */}
        <div className="rounded-card border border-border bg-card p-6">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Output Cost (est.)</div>
          <div className="mt-2 font-mono text-2xl text-foreground">
            ${outputCost.toFixed(6)}
          </div>
          <div className="mt-3">
            <label className="text-xs text-muted-foreground">
              Expected output: {outputTokens.toLocaleString()} tokens
            </label>
            <input
              type="range"
              min={0}
              max={4000}
              step={50}
              value={outputTokens}
              onChange={e => setOutputTokens(Number(e.target.value))}
              className="mt-1 w-full accent-primary"
            />
          </div>
        </div>

        {/* Total */}
        <div className="rounded-card border-2 border-warning/40 bg-warning/5 p-6">
          <div className="text-xs font-medium uppercase tracking-wider text-warning">Total Estimated Cost</div>
          <div className="mt-2 font-mono text-3xl text-warning">
            ~${totalCost.toFixed(6)}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            for this prompt + {outputTokens} output tokens
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostEstimator;
