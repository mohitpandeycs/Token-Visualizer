import { ChatMessage } from "./MessageBuilder";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface ChatTemplatePreviewProps {
  messages: ChatMessage[];
}

const ChatTemplatePreview = ({ messages }: ChatTemplatePreviewProps) => {
  const [showWhitespace, setShowWhitespace] = useState(false);

  const formatMessages = () => {
    return messages
      .map((msg) => {
        const role = msg.role === "custom" && msg.name ? msg.name : msg.role;
        return `<|im_start|>${role}<|im_sep|>${msg.content}<|im_end|>`;
      })
      .join("")
      .concat("<|im_start|>assistant<|im_sep|>");
  };

  const raw = formatMessages();

  const displayText = showWhitespace
    ? raw.replace(/ /g, "·").replace(/\n/g, "↵\n").replace(/\t/g, "→")
    : raw;

  if (messages.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Chat Template Format
        </label>
        <button
          onClick={() => setShowWhitespace(!showWhitespace)}
          className="flex items-center gap-1 rounded-btn px-2 py-1 text-[11px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          {showWhitespace ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
          {showWhitespace ? "Hide" : "Show"} whitespace
        </button>
      </div>
      <div className="max-h-[200px] overflow-y-auto rounded-card border border-border bg-card p-3">
        <pre className="whitespace-pre-wrap break-all font-mono text-xs text-muted-foreground leading-relaxed">
          {displayText}
        </pre>
      </div>
    </div>
  );
};

export default ChatTemplatePreview;
