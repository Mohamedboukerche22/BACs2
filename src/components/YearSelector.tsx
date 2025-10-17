import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface YearSelectorProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
}

export const YearSelector = ({ selectedYear, onYearChange }: YearSelectorProps) => {
  const currentYear = 2024;
  const years = Array.from({ length: currentYear - 2008 + 1 }, (_, i) => currentYear - i);

  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold">اختر السنة</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {years.map((year) => (
          <Button
            key={year}
            variant={selectedYear === year ? "default" : "outline"}
            onClick={() => onYearChange(year)}
            className={`transition-all hover:scale-105 ${
              selectedYear === year
                ? "bg-gradient-to-r from-primary to-accent shadow-lg glow-border"
                : "hover:border-primary/50"
            }`}
          >
            {year}
          </Button>
        ))}
      </div>
    </div>
  );
};
