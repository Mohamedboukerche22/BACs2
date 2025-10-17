import React from "react";

export type SubjectCardProps = {
  id: string;
  subject: string;
  year: number;
  hasCorrection: boolean;
  onViewSujet: () => void;
  onViewCorrection: () => void;
};

export const SubjectCard: React.FC<SubjectCardProps> = ({
  subject,
  year,
  hasCorrection,
  onViewSujet,
  onViewCorrection,
}) => {
  return (
    <div className="p-4 bg-card rounded-lg shadow-md text-center">
      <h3 className="text-lg font-bold mb-2">{subject}</h3>
      <p className="text-sm text-muted-foreground mb-4">بكالوريا {year}</p>

      <div className="flex gap-2 justify-center">
        <button
          onClick={onViewSujet}
          className="px-3 py-1 rounded-md border border-transparent hover:border-accent transition"
        >
          الموضوع (Sujet)
        </button>

        {hasCorrection ? (
          <button
            onClick={onViewCorrection}
            className="px-3 py-1 rounded-md border border-transparent hover:border-accent transition bg-accent/10"
          >
            التصحيح (Correction)
          </button>
        ) : (
          <button
            disabled
            title="التصحيح غير متوفر"
            className="px-3 py-1 rounded-md opacity-60 cursor-not-allowed border border-border/50"
          >
            التصحيح غير متوفر
          </button>
        )}
      </div>
    </div>
  );
};
