import { useState, useRef, useEffect } from "react";
import { MODEL_GROUPS, ALL_MODELS } from "@/lib/models";
import { ChevronDown, Search } from "lucide-react";

interface ModelComboboxProps {
  value: string;
  onChange: (modelId: string) => void;
}

const ModelCombobox = ({ value, onChange }: ModelComboboxProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedModel = ALL_MODELS.find(m => m.id === value);

  const filteredGroups = MODEL_GROUPS.map(group => ({
    ...group,
    models: group.models.filter(m =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.provider.toLowerCase().includes(search.toLowerCase()) ||
      m.id.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(g => g.models.length > 0);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => { setOpen(!open); setSearch(""); }}
        className="flex w-full items-center justify-between rounded-btn border border-border bg-card px-4 py-2.5 font-mono text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
        aria-label="Select AI model"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{selectedModel ? `${selectedModel.provider} · ${selectedModel.name}` : "Select model"}</span>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-card border border-border bg-popover shadow-lg">
          <div className="flex items-center gap-2 border-b border-border px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              ref={inputRef}
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search models…"
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
          <div className="max-h-[280px] overflow-y-auto p-1">
            {filteredGroups.length === 0 ? (
              <div className="py-4 text-center text-sm text-muted-foreground">No models found</div>
            ) : (
              filteredGroups.map(group => (
                <div key={group.provider}>
                  <div className="px-2 py-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    {group.provider}
                  </div>
                  {group.models.map(m => (
                    <button
                      key={m.id}
                      onClick={() => { onChange(m.id); setOpen(false); }}
                      className={`flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                        m.id === value ? "bg-accent text-accent-foreground" : "text-foreground"
                      }`}
                    >
                      <span className="font-mono text-xs">{m.name}</span>
                      <span className="text-[10px] text-muted-foreground">{m.contextWindow.toLocaleString()} ctx</span>
                    </button>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelCombobox;
