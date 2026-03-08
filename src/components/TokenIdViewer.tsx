import { TokenResult } from "@/lib/tokenizer";
import { Hash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

interface TokenIdViewerProps {
  result: TokenResult;
}

const TokenIdViewer = ({ result }: TokenIdViewerProps) => {
  if (!result || result.tokens.length === 0) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-1.5 rounded-btn border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
          <Hash className="h-3.5 w-3.5" />
          View Token IDs
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-2xl overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-mono">
            <Hash className="h-4 w-4" />
            Token IDs ({result.totalTokens} tokens)
          </DialogTitle>
          <DialogDescription>
            Each token's text representation and its corresponding numeric ID used by the model.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-popover">
              <tr className="border-b border-border text-left">
                <th className="px-3 py-2 text-xs font-medium text-muted-foreground">#</th>
                <th className="px-3 py-2 text-xs font-medium text-muted-foreground">Token</th>
                <th className="px-3 py-2 text-xs font-medium text-muted-foreground text-right">ID</th>
                <th className="px-3 py-2 text-xs font-medium text-muted-foreground text-right">Bytes</th>
              </tr>
            </thead>
            <tbody>
              {result.tokens.map((token, i) => {
                const displayText = token.text
                  .replace(/ /g, "·")
                  .replace(/\n/g, "↵")
                  .replace(/\t/g, "→");
                const bytes = new TextEncoder().encode(token.text).length;

                return (
                  <tr
                    key={i}
                    className="border-b border-border/50 transition-colors hover:bg-accent/50"
                  >
                    <td className="px-3 py-1.5 font-mono text-xs text-muted-foreground">
                      {i + 1}
                    </td>
                    <td className="px-3 py-1.5">
                      <span
                        className={`chip-${i % 10} inline-flex items-center rounded-chip px-2.5 py-1 font-mono text-sm font-medium`}
                      >
                        {displayText || "⎵"}
                      </span>
                    </td>
                    <td className="px-3 py-1.5 text-right font-mono text-xs text-foreground">
                      {token.id}
                    </td>
                    <td className="px-3 py-1.5 text-right font-mono text-xs text-muted-foreground">
                      {bytes}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TokenIdViewer;
