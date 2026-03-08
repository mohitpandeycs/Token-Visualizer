import Navbar from "@/components/Navbar";
import ModelTable from "@/components/ModelTable";
import Footer from "@/components/Footer";
import { useTheme } from "@/hooks/useTheme";

const Models = () => {
  const { isDark, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <Navbar isDark={isDark} onToggleTheme={toggle} />
      <div className="pt-8" />
      <ModelTable />
      <Footer />
    </div>
  );
};

export default Models;
