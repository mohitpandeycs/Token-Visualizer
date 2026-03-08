import { TokenResult } from "@/lib/tokenizer";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface TokenIdsPanelProps {
  result: TokenResult;
  highlightedIndex: number | null;
  onHoverIndex: (index: number | null) => void;
}

const TokenIdsPanel = ({ result, highlightedIndex, onHoverIndex }: TokenIdsPanelProps) => {
  const [copied, setCopied] = useState(false);

  if (!result || result.tokens.length === 0) return null;

  const ids = result.tokens.map((t) => t.id);

  const idsString = ids.join(", ");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(idsString);
    setCopied(true);
    toast.success("Token IDs copied");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-foreground">
          Token IDs
        </label>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 rounded-btn px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          {copied ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="max-h-[200px] overflow-y-auto rounded-card border border-border bg-card p-3">
        <p className="break-all font-mono text-xs leading-relaxed">
          {ids.map((id, i) => (
            <span key={i}>
              <span
                className={`cursor-default rounded px-0.5 transition-colors ${
                  highlightedIndex === i
                    ? "bg-primary/20 text-primary font-semibold"
                    : "text-muted-foreground"
                }`}
                onMouseEnter={() => onHoverIndex(i)}
                onMouseLeave={() => onHoverIndex(null)}
              >
                {id}
              </span>
              {i < ids.length - 1 && <span className="text-muted-foreground">, </span>}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default TokenIdsPanel;
