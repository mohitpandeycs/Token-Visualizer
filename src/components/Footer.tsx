import { Github, Linkedin, Twitter } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const Footer = () => {
  return (
    <footer className="mt-12 border-t border-border px-6 py-8 md:px-12 bg-card">
      <div className="mx-auto max-w-content flex-col gap-4 text-sm text-muted-foreground items-center md:justify-between flex md:flex-row">
        <span>© 2026 Token Visualizer</span>
        <span>
          Built by{" "}
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="https://github.com/mohitpandeycs"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-primary hover:underline"
              >
                Mohit :)
              </a>
            </TooltipTrigger>
            <TooltipContent>Explore My Work</TooltipContent>
          </Tooltip>
        </span>
        <div className="flex items-center gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="https://github.com/mohitpandeycs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </TooltipTrigger>
            <TooltipContent>Follow :)</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="https://www.linkedin.com/in/mohitpandeycs/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </TooltipTrigger>
            <TooltipContent>Follow :)</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="https://x.com/mohitpandeycs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Twitter / X"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </TooltipTrigger>
            <TooltipContent>Follow :)</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
