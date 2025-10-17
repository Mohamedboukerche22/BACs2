import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Home, GraduationCap } from "lucide-react";

const branches = [
 /* { id: "رياضيات", name: "رياضيات", icon: "📐", description: "شعبة الرياضيات" },*/
  { id: "علوم تجريبية", name: "علوم تجريبية", icon: "🔬", description: "شعبة العلوم التجريبية" },
  /*{ id: "آداب وفلسفة", name: "آداب وفلسفة", icon: "📚", description: "شعبة الآداب والفلسفة" },*/
];

const Branches = () => {
  const navigate = useNavigate();

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
          <h1 className="text-xl font-bold">اختر الشعبة</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <GraduationCap className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-semibold">اختر شعبتك</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto animate-fade-in">
          {branches.map((branch) => (
            <Card
              key={branch.id}
              onClick={() => navigate(`/years/${branch.id}`)}
              className="glass-effect p-8 hover:glow-border transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
            >
              <div className="text-center space-y-4">
                <div className="text-6xl mb-4">{branch.icon}</div>
                <h3 className="text-2xl font-bold">{branch.name}</h3>
                <p className="text-muted-foreground">{branch.description}</p>
                <div className="pt-4">
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:border-primary/50 group-hover:bg-primary/10"
                  >
                    <BookOpen className="w-4 h-4 ml-2" />
                    اختر هذه الشعبة
                  </Button>
                </div>
              </div>
            </Card>
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

export default Branches;