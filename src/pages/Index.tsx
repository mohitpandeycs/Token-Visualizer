import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import Playground from "@/components/Playground";
import StatsStrip from "@/components/StatsStrip";
import CostEstimator from "@/components/CostEstimator";
import Footer from "@/components/Footer";
import { useTheme } from "@/hooks/useTheme";
import { TokenResult } from "@/lib/tokenizer";

const Index = () => {
  const { isDark, toggle } = useTheme();
  const [tokenResult, setTokenResult] = useState<TokenResult | null>(null);
  const [activeModelId, setActiveModelId] = useState("gpt-4o");

  const handleTokenized = useCallback((result: TokenResult, modelId: string) => {
    setTokenResult(result);
    setActiveModelId(modelId);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar isDark={isDark} onToggleTheme={toggle} />
      <HeroBanner />
      <Playground onTokenized={handleTokenized} />
      <StatsStrip result={tokenResult} modelId={activeModelId} />
      <CostEstimator result={tokenResult} modelId={activeModelId} />
      <Footer />
    </div>
  );
};

export default Index;
