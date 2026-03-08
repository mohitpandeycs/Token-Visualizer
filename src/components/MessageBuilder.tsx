import { useState } from "react";
import { X, Plus } from "lucide-react";

export type MessageRole = "system" | "user" | "assistant" | "custom";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  name?: string; // for custom role
}

interface MessageBuilderProps {
  onTextChange: (fullText: string) => void;
  onMessagesChange?: (messages: ChatMessage[]) => void;
}

const ROLE_COLORS: Record<MessageRole, string> = {
  system: "text-muted-foreground border-muted-foreground/30 bg-muted/50",
  user: "text-primary border-primary/30 bg-primary/5",
  assistant: "text-success border-success/30 bg-success/5",
  custom: "text-warning border-warning/30 bg-warning/5",
};

const ROLE_OPTIONS: { value: MessageRole; label: string }[] = [
  { value: "system", label: "System" },
  { value: "user", label: "User" },
  { value: "assistant", label: "Assistant" },
  { value: "custom", label: "Custom" },
];

let nextId = 1;
const genId = () => `msg-${nextId++}`;

const MessageBuilder = ({ onTextChange, onMessagesChange }: MessageBuilderProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: genId(), role: "system", content: "You are a helpful assistant" },
    { id: genId(), role: "user", content: "" },
  ]);

  const updateAndNotify = (updated: ChatMessage[]) => {
    setMessages(updated);
    onMessagesChange?.(updated);
    const fullText = updated
      .map((m) => {
        const prefix = m.role === "custom" && m.name ? m.name : m.role;
        return `[${prefix}]: ${m.content}`;
      })
      .filter((line) => line.replace(/^\[.*?\]: /, "").trim())
      .join("\n\n");
    onTextChange(fullText);
  };

  const addMessage = () => {
    updateAndNotify([...messages, { id: genId(), role: "user", content: "" }]);
  };

  const removeMessage = (id: string) => {
    if (messages.length <= 1) return;
    updateAndNotify(messages.filter((m) => m.id !== id));
  };

  const updateMessage = (id: string, updates: Partial<ChatMessage>) => {
    updateAndNotify(
      messages.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
  };

  return (
    <div className="flex flex-col gap-2">
      {messages.map((msg) => (
        <div key={msg.id} className="flex items-start gap-2">
          {/* Role selector */}
            <select
            value={msg.role}
            onChange={(e) =>
              updateMessage(msg.id, { role: e.target.value as MessageRole })
            }
            className={`h-9 shrink-0 appearance-none rounded-btn border border-border bg-card px-2 pr-6 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 [&>option]:bg-popover [&>option]:text-popover-foreground`}
            aria-label="Message role"
          >
            {ROLE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Content area */}
          <div className="flex flex-1 flex-col gap-1">
            {msg.role === "custom" && (
              <input
                value={msg.name || ""}
                onChange={(e) => updateMessage(msg.id, { name: e.target.value })}
                placeholder="Name"
                className="h-8 rounded-btn border border-border bg-card px-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            )}
            <input
              value={msg.content}
              onChange={(e) =>
                updateMessage(msg.id, { content: e.target.value })
              }
              placeholder="Content"
              className="h-9 w-full rounded-btn border border-border bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Remove button */}
          <button
            onClick={() => removeMessage(msg.id)}
            disabled={messages.length <= 1}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-btn text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30"
            aria-label="Remove message"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}

      <button
        onClick={addMessage}
        className="flex items-center gap-1.5 self-start rounded-btn border border-dashed border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <Plus className="h-3.5 w-3.5" />
        Add message
      </button>
    </div>
  );
};

export default MessageBuilder;
