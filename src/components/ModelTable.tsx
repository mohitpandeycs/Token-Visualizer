import { MODEL_GROUPS } from "@/lib/models";

const ModelTable = () => {
  return (
    <section className="mx-auto max-w-content px-6 py-12">
      <h2 className="font-display text-2xl text-foreground md:text-[28px]">Supported Models</h2>
      <p className="mb-6 mt-2 text-sm text-muted-foreground">
        All models available in the tokenizer, with pricing and context details.
      </p>

      <div className="overflow-x-auto rounded-card border border-border">
        <table className="w-full min-w-[700px] text-sm">
          <thead>
            <tr className="border-b border-border bg-card text-left">
              <th className="px-4 py-3 font-medium text-muted-foreground">Provider</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Model</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Context</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Encoding</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Input $/1M</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Output $/1M</th>
            </tr>
          </thead>
          <tbody>
            {MODEL_GROUPS.map(group =>
              group.models.map((model, mi) => (
                <tr
                  key={model.id}
                  className={`border-b border-border ${mi % 2 === 0 ? "bg-card" : "bg-surface-alt"}`}
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {mi === 0 ? group.provider : ""}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-foreground">{model.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {model.contextWindow.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{model.encoding}</td>
                  <td className="px-4 py-3 text-right font-mono text-xs text-foreground">
                    ${model.inputCostPer1M.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-xs text-foreground">
                    ${model.outputCostPer1M.toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ModelTable;
