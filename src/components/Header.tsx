import { BookOpen, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  onSearch: (value: string) => void;
}

export const Header = ({ onSearch }: HeaderProps) => {
  return (
    <header className="glass-effect sticky top-0 z-50 border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                بنك البكالوريا
              </h1>
              <p className="text-sm text-muted-foreground">امتحانات وحلول 2008 - 2024</p>
            </div>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="ابحث عن مادة أو سنة..."
              className="pr-10 bg-secondary/50 border-border/50 focus:border-primary transition-all"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
