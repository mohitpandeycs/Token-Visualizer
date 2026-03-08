import { useState, useEffect, useCallback } from "react";
import { tokenize, TokenResult } from "@/lib/tokenizer";

interface SystemPromptPanelProps {
  modelId: string;
}

const DEFAULT_SYSTEM = `You are an expert AI Assistant. You work on START, PLAN, and OUTPUT steps. First PLAN what needs to be done (can be multiple steps), then deliver the OUTPUT.`;

const SystemPromptPanel = ({ modelId }: SystemPromptPanelProps) => {
  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_SYSTEM);
  const [userMessage, setUserMessage] = useState("");
  const [systemCount, setSystemCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  const updateCounts = useCallback(async () => {
    const sysResult = await tokenize(systemPrompt, modelId);
    const usrResult = await tokenize(userMessage, modelId);
    setSystemCount(sysResult.totalTokens);
    setUserCount(usrResult.totalTokens);
  }, [systemPrompt, userMessage, modelId]);

  useEffect(() => {
    const timer = setTimeout(updateCounts, 300);
    return () => clearTimeout(timer);
  }, [updateCounts]);

  return (
    <section className="mx-auto max-w-content px-6 py-12">
      <h2 className="font-display text-2xl text-foreground md:text-[28px]">Try a System Prompt</h2>
      <p className="mb-6 mt-2 text-sm text-muted-foreground">
        Use the START → PLAN → OUTPUT chain-of-thought pattern. Token counts update live.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            System Prompt
          </label>
          <textarea
            value={systemPrompt}
            onChange={e => setSystemPrompt(e.target.value)}
            className="min-h-[180px] w-full resize-y rounded-card border border-border bg-card p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
          />
          <span className="font-mono text-xs text-muted-foreground">{systemCount} tokens</span>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            User Message
          </label>
          <textarea
            value={userMessage}
            onChange={e => setUserMessage(e.target.value)}
            placeholder="Type your message here…"
            className="min-h-[180px] w-full resize-y rounded-card border border-border bg-card p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
          />
          <span className="font-mono text-xs text-muted-foreground">{userCount} tokens</span>
        </div>
      </div>

      <div className="mt-4 rounded-btn border border-border bg-card px-4 py-3 text-center text-sm text-muted-foreground">
        <span className="font-mono font-medium text-foreground">{systemCount}</span> system +{" "}
        <span className="font-mono font-medium text-foreground">{userCount}</span> user ={" "}
        <span className="font-mono font-medium text-primary">{systemCount + userCount}</span> total context tokens
      </div>
    </section>
  );
};

export default SystemPromptPanel;
