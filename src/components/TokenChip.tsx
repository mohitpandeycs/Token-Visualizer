import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TokenChipProps {
  text: string;
  id: number;
  index: number;
  isHighlighted?: boolean;
  onHover?: (index: number | null) => void;
  showWhitespace?: boolean;
}

function getByteInfo(text: string) {
  const bytes = new TextEncoder().encode(text);
  const hex = Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join(" ");
  return { byteLength: bytes.length, hex };
}

const TokenChip = ({ text, id, index, isHighlighted, onHover, showWhitespace }: TokenChipProps) => {
  const chipClass = `chip-${index % 10}`;
  const displayText = showWhitespace
    ? text.replace(/ /g, "·").replace(/\n/g, "↵\n").replace(/\t/g, "→")
    : text.replace(/\n/g, "↵\n").replace(/\t/g, "→");
  const { byteLength, hex } = getByteInfo(text);

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={`${chipClass} inline cursor-default font-mono text-[15px] leading-[2] py-[2px] transition-all whitespace-pre-wrap ${
              isHighlighted
                ? "ring-2 ring-primary ring-offset-1 rounded-[2px] shadow-md font-semibold z-10 relative"
                : ""
            }`}
            tabIndex={0}
            role="listitem"
            aria-label={`Token "${text}", ID ${id}`}
            onMouseEnter={() => onHover?.(index)}
            onMouseLeave={() => onHover?.(null)}
          >
            {displayText || "⎵"}
            {isHighlighted && (
              <span className="ml-0.5 text-[9px] font-mono opacity-60 align-super">
                {id}
              </span>
            )}
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[240px]">
          <div className="space-y-1 text-xs">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Token ID</span>
              <span className="font-mono font-medium">{id}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Bytes</span>
              <span className="font-mono font-medium">{byteLength}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">UTF-8 Hex</span>
              <span className="font-mono font-medium">{hex}</span>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TokenChip;
