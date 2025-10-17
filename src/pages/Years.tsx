import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Home, ArrowRight } from "lucide-react";

const Years = () => {
  const navigate = useNavigate();
  const { branch } = useParams();
  const currentYear = 2024;
  const years = Array.from({ length: currentYear - 2008 + 1 }, (_, i) => currentYear - i);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
          >
            <Home className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">{branch} - اختر السنة</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/branches")}
          >
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <Calendar className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-semibold">اختر سنة البكالوريا</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto animate-fade-in">
          {years.map((year) => (
            <Button
              key={year}
              variant="outline"
              onClick={() => navigate(`/subjects/${branch}/${year}`)}
              className="h-24 text-2xl font-bold hover:scale-105 transition-all hover:border-primary/50 glass-effect"
            >
              {year}
            </Button>
          ))}
        </div>
      </main>

      <footer className="mt-20 py-8 border-t border-border/50 bg-card/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p className="mb-2">© 2024 بنك البكالوريا الجزائرية</p>
          <p className="flex items-center justify-center gap-2">
            Created by 
            <a 
              href="https://github.com/mohamedboukerche22" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-accent transition-colors underline"
            >
              Mohamed Boukerche
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Years;
