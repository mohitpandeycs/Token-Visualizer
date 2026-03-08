import { Sun, Moon, Table, Star } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import logo from "@/assets/logo.png";

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

const Navbar = ({ isDark, onToggleTheme }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 h-16 border-b border-border bg-card/85 backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-content items-center justify-between px-6">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo} alt="Token Visualizer logo" className="h-8 w-8 rounded-full" />
          <h1 className="font-display text-xl text-foreground">Token Visualizer</h1>
        </div>

        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => navigate("/models")}
                className={`flex h-9 items-center gap-2 rounded-full border border-border px-4 text-sm font-medium transition-colors hover:bg-muted ${
                  location.pathname === "/models"
                    ? "bg-secondary text-foreground"
                    : "bg-card text-muted-foreground"
                }`}
                aria-label="Supported Models"
              >
                <Table className="h-4 w-4" />
                <span className="hidden sm:inline">Models</span>
              </button>
            </TooltipTrigger>
            <TooltipContent>View supported AI models</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onToggleTheme}
                className="flex h-9 items-center gap-2 rounded-full border border-border bg-secondary px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
              </button>
            </TooltipTrigger>
            <TooltipContent>Switch to {isDark ? "light" : "dark"} mode</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="https://github.com/mohitpandeycs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 items-center gap-2 rounded-full border border-border bg-secondary px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                aria-label="Star on GitHub"
              >
                <Star className="h-4 w-4" />
                <span className="hidden sm:inline">Star</span>
              </a>
            </TooltipTrigger>
            <TooltipContent>⭐ Star this repo</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
