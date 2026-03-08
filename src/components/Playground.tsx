import { useState, useCallback, useEffect, useRef } from "react";
import { MODEL_GROUPS, getModel } from "@/lib/models";
import { tokenize, TokenResult } from "@/lib/tokenizer";
import TokenChip from "./TokenChip";
import TokenIdViewer from "./TokenIdViewer";
import TokenIdsPanel from "./TokenIdsPanel";
import ChatTemplatePreview from "./ChatTemplatePreview";
import ModelCombobox from "./ModelCombobox";
import MessageBuilder, { ChatMessage } from "./MessageBuilder";
import { ArrowRight, Loader2, X, Copy, Check, Zap, ZapOff, MessageSquare, Type, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const SAMPLE_PRESETS = [
  { label: "Short", text: "The quick brown fox jumps over the lazy dog." },
  { label: "Code", text: `function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}\nconsole.log(fibonacci(10));` },
  { label: "Multilingual", text: "Hello 世界! Bonjour le monde! こんにちは世界! مرحبا بالعالم" },
  { label: "Long", text: "Artificial intelligence is transforming how we interact with technology. From natural language processing to computer vision, AI models are becoming increasingly sophisticated. Tokenization is a fundamental step in how these models process text — breaking down human language into smaller units that the model can understand and generate. Understanding tokenization helps developers optimize prompts, reduce costs, and build better AI-powered applications." },
];

type InputMode = "plain" | "messages";

interface PlaygroundProps {
  onTokenized: (result: TokenResult, modelId: string) => void;
}

const Playground = ({ onTokenized }: PlaygroundProps) => {
  const [text, setText] = useState("");
  const [modelId, setModelId] = useState("gpt-4o");
  const [result, setResult] = useState<TokenResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [autoMode, setAutoMode] = useState(true);
  const [copied, setCopied] = useState(false);
  const [inputMode, setInputMode] = useState<InputMode>("plain");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [hoveredTokenIndex, setHoveredTokenIndex] = useState<number | null>(null);
  const [showWhitespace, setShowWhitespace] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const handleTokenize = useCallback(async () => {
    if (!text.trim()) {
      setResult(null);
      onTokenized({ totalTokens: 0, tokens: [], encoding: "", isEstimated: false }, modelId);
      return;
    }
    setLoading(true);
    try {
      const res = await tokenize(text, modelId);
      setResult(res);
      onTokenized(res, modelId);
      if (window.innerWidth < 768 && outputRef.current) {
        outputRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [text, modelId, onTokenized]);

  useEffect(() => {
    if (!autoMode) return;
    const timer = setTimeout(() => {
      handleTokenize();
    }, 300);
    return () => clearTimeout(timer);
  }, [text, modelId, autoMode, handleTokenize]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        handleTokenize();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleTokenize]);

  const handleClear = () => {
    setText("");
    setResult(null);
    onTokenized({ totalTokens: 0, tokens: [], encoding: "", isEstimated: false }, modelId);
  };

  const handleCopyResult = async () => {
    if (!result) return;
    const json = JSON.stringify({
      totalTokens: result.totalTokens,
      encoding: result.encoding,
      isEstimated: result.isEstimated,
      tokens: result.tokens,
    }, null, 2);
    await navigator.clipboard.writeText(json);
    setCopied(true);
    toast.success("Copied token data to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const model = getModel(modelId);

  return (
    <section className="mx-auto max-w-content px-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Input Panel */}
        <div className="flex flex-col gap-3">
          <label className="text-xs font-bold uppercase tracking-wider text-foreground">
            Choose AI Model
          </label>
          <ModelCombobox value={modelId} onChange={setModelId} />

          <div className="flex items-center justify-between mt-2">
            <label className="text-xs font-bold uppercase tracking-wider text-foreground">
              Your Prompt
            </label>
            <div className="flex items-center gap-2">
              {/* Input mode toggle */}
              <div className="flex items-center rounded-btn border border-border bg-card p-0.5">
                <button
                  onClick={() => setInputMode("plain")}
                  className={`flex items-center gap-1 rounded-sm px-2 py-1 text-[11px] font-medium transition-colors ${
                    inputMode === "plain"
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-label="Plain text mode"
                >
                  <Type className="h-3 w-3" />
                  Plain
                </button>
                <button
                  onClick={() => setInputMode("messages")}
                  className={`flex items-center gap-1 rounded-sm px-2 py-1 text-[11px] font-medium transition-colors ${
                    inputMode === "messages"
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-label="Messages mode"
                >
                  <MessageSquare className="h-3 w-3" />
                  Messages
                </button>
              </div>
              {text && (
                <button
                  onClick={handleClear}
                  className="flex items-center gap-1 rounded-btn px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Clear input"
                >
                  <X className="h-3 w-3" />
                  Clear
                </button>
              )}
            </div>
          </div>

          {inputMode === "plain" ? (
            <>
              {/* Sample presets */}
              <div className="flex flex-wrap gap-1.5">
                {SAMPLE_PRESETS.map(preset => (
                  <button
                    key={preset.label}
                    onClick={() => setText(preset.text)}
                    className="rounded-chip border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Paste or type your text here…"
                className="min-h-[220px] w-full resize-y rounded-card border border-border bg-card p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
                aria-label="Text input for tokenization"
              />
            </>
          ) : (
            <MessageBuilder onTextChange={setText} onMessagesChange={setMessages} />
          )}

          {/* Char & word count */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-mono">{charCount} chars · {wordCount} words</span>
            <button
              onClick={() => setAutoMode(!autoMode)}
              className="flex items-center gap-1 rounded-btn px-2 py-1 transition-colors hover:bg-muted hover:text-foreground"
              aria-label={autoMode ? "Disable auto-tokenize" : "Enable auto-tokenize"}
              title={autoMode ? "Auto-tokenize ON" : "Auto-tokenize OFF"}
            >
              {autoMode ? <Zap className="h-3 w-3 text-success" /> : <ZapOff className="h-3 w-3" />}
              <span className="hidden sm:inline">{autoMode ? "Live" : "Manual"}</span>
            </button>
          </div>

          {!autoMode && (
            <button
              onClick={handleTokenize}
              disabled={loading || !text.trim()}
              className="flex items-center justify-center gap-2 rounded-btn bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 md:self-end"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
              Tokenize
              <kbd className="ml-1 hidden rounded border border-primary-foreground/20 px-1.5 py-0.5 font-mono text-[10px] text-primary-foreground/60 sm:inline">
                ⌘↵
              </kbd>
            </button>
          )}

          {/* Chat Template Preview (only in messages mode) */}
          {inputMode === "messages" && messages.length > 0 && (
            <ChatTemplatePreview messages={messages} />
          )}
        </div>

        {/* Output Panel */}
        <div className="flex flex-col gap-3" ref={outputRef}>
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-foreground">
              Token Breakdown
            </label>
            <div className="flex items-center gap-2">
              {result && result.tokens.length > 0 && (
                <button
                  onClick={() => setShowWhitespace(!showWhitespace)}
                  className="flex items-center gap-1 rounded-btn px-2 py-1 text-[11px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {showWhitespace ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  Whitespace
                </button>
              )}
              {result && result.tokens.length > 0 && (
                <button
                  onClick={handleCopyResult}
                  className="flex items-center gap-1 rounded-btn px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Copy token data as JSON"
                >
                  {copied ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
                  {copied ? "Copied" : "Copy JSON"}
                </button>
              )}
            </div>
          </div>
          <div className="min-h-[220px] max-h-[400px] overflow-y-auto rounded-card border border-border bg-surface-alt p-4">
            {loading && !result ? (
              <div className="flex h-full min-h-[188px] items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : !result || result.tokens.length === 0 ? (
              <div className="flex h-full min-h-[188px] flex-col items-center justify-center gap-3 text-center">
                <div className="flex gap-1">
                  {["T", "o", "k", "e", "n"].map((char, i) => (
                    <span
                      key={i}
                      className={`chip-${i % 10} inline-flex items-center rounded-chip px-2 py-0.5 font-mono text-xs font-medium`}
                    >
                      {char}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  {text.trim() ? "No tokens generated" : "Type or paste text to see tokens"}
                </p>
              </div>
            ) : (
              <div className="break-words [overflow-wrap:break-word] [word-break:break-word]">
                {result.tokens.map((token, i) => (
                  <TokenChip key={i} text={token.text} id={token.id} index={i} isHighlighted={hoveredTokenIndex === i} onHover={setHoveredTokenIndex} showWhitespace={showWhitespace} />
                ))}
              </div>
            )}
          </div>
          {result && result.tokens.length > 0 && (
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="font-mono text-lg font-medium text-foreground">{result.totalTokens}</span>
              <span className="text-muted-foreground">tokens</span>
              <span className="text-muted-foreground">·</span>
              <span className="font-mono text-xs text-muted-foreground">{model?.name}</span>
              <span className="text-muted-foreground">·</span>
              <span className="font-mono text-xs text-muted-foreground">{result.encoding}</span>
              {result.isEstimated && (
                <span className="rounded-full bg-warning/20 px-2 py-0.5 text-[10px] font-medium text-warning">
                  ESTIMATED
                </span>
              )}
            </div>
          )}
          {/* Token ID Viewer Dialog */}
          {result && result.tokens.length > 0 && (
            <TokenIdViewer result={result} />
          )}
          {/* Token IDs Panel */}
          {result && result.tokens.length > 0 && (
            <TokenIdsPanel result={result} highlightedIndex={hoveredTokenIndex} onHoverIndex={setHoveredTokenIndex} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Playground;
