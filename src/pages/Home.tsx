import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowLeft } from "lucide-react";
import { examData } from "@/data/examData";

const Home = () => {
  const navigate = useNavigate();

  const stats = {
    totalExams: examData.length,
    totalYears: new Set(examData.map((e) => e.year)).size,
    totalSubjects: new Set(examData.map((e) => e.subject)).size,
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center animate-fade-in">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
          <GraduationCap className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-primary">مكتبة شاملة للبكالوريا</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          بنك امتحانات البكالوريا الجزائرية
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12">
          مكتبة شاملة تحتوي على جميع امتحانات البكالوريا مع الحلول النموذجية من 2008 حتى 2024
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          <div className="glass-effect px-8 py-6 rounded-xl">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stats.totalExams}</div>
            <div className="text-sm md:text-base text-muted-foreground">امتحان متوفر</div>
          </div>
          <div className="glass-effect px-8 py-6 rounded-xl">
            <div className="text-4xl md:text-5xl font-bold text-accent mb-2">{stats.totalYears}</div>
            <div className="text-sm md:text-base text-muted-foreground">سنة دراسية</div>
          </div>
          <div className="glass-effect px-8 py-6 rounded-xl">
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stats.totalSubjects}</div>
            <div className="text-sm md:text-base text-muted-foreground">مادة مختلفة</div>
          </div>
        </div>

        <Button 
          size="lg"
          onClick={() => navigate("/branches")}
          className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent shadow-lg glow-border hover:scale-105 transition-transform"
        >
          <ArrowLeft className="w-5 h-5 ml-2" />
          ابدأ الآن
        </Button>
      </div>

      <footer className="absolute bottom-8 text-center text-muted-foreground text-sm">
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
      </footer>
    </div>
  );
};

export default Home;
