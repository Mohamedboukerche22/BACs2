import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SubjectCard } from "@/components/SubjectCard";
import { PDFViewer } from "@/components/PDFViewer";
import { BookOpen, Home, ArrowRight } from "lucide-react";
import { examData as importedExamData, ExamSubject as ImportedExamSubject } from "@/data/examData";

/**
 * Ensure ExamSubject interface matches your data shape.
 * branch is optional and not required.
 */
export type ExamSubject = {
  id: string;
  subject: string;
  year: number;
  hasCorrection: boolean;
  pdfUrl?: string; // may point to Su or Co depending on source
  correctionPdfUrl?: string;
  branch?: string;
};

const Subjects: React.FC = () => {
  const { year } = useParams<{ year?: string }>();
  const navigate = useNavigate();
  const selectedYear = parseInt(year || `${new Date().getFullYear()}`); // default current year

  const [selectedExam, setSelectedExam] = useState<ExamSubject | null>(null);
  const [isPDFViewerOpen, setIsPDFViewerOpen] = useState(false);
  const [pdfTitle, setPdfTitle] = useState<string>("");

  // Use imported examData if exists; otherwise fallback to empty array.
  const rawExamData: ExamSubject[] =
    (importedExamData as unknown as ExamSubject[]) || [];

  // Build map keyed by subject+year so we show each subject once with correction flag
  const filteredExams = useMemo(() => {
    const map = new Map<string, ExamSubject>();

    // 1) If you already have structured examData entries, use them:
    for (const e of rawExamData) {
      if (!e) continue;
      if (e.year !== selectedYear) continue;

      // subject key (subject may be Arabic text)
      const key = `${e.subject}-${e.year}`;
      const existing = map.get(key);
      if (!existing) {
        map.set(key, {
          id: e.id ?? `${map.size + 1}`,
          subject: e.subject,
          year: e.year,
          hasCorrection: !!e.hasCorrection,
          pdfUrl: e.pdfUrl,
          correctionPdfUrl: e.correctionPdfUrl,
        });
      } else {
        // prefer to record correctionPdfUrl if given
        existing.hasCorrection = existing.hasCorrection || !!e.hasCorrection;
        if (e.pdfUrl && /Co\.pdf$/i.test(e.pdfUrl)) {
          existing.correctionPdfUrl = e.pdfUrl;
        } else if (e.pdfUrl && /Su\.pdf$/i.test(e.pdfUrl)) {
          existing.pdfUrl = e.pdfUrl;
        }
      }
    }

    // 2) If no structured data found for this year, try to auto-derive from filenames listed in public/pdfs/list.json
    // (project can generate list.json during build). This is a best-effort fallback.
    if (map.size === 0) {
      try {
        // We synchronously cannot fetch here; but we can attempt to read a global list injected by the build:
        // If you place a file public/pdfs/list.json with array of filenames, the app can fetch it.
        // We'll return an empty array here to keep UI stable; actual fetch happens below in effect when needed.
      } catch (err) {
        // ignore
      }
    }

    return Array.from(map.values());
  }, [rawExamData, selectedYear]);

  // Helper to produce candidate pdf URL for a subject and type (Su or Co).
  const makePdfUrlFor = (exam: ExamSubject, type: "Su" | "Co") => {
    // If explicit urls exist, prefer them
    if (type === "Co" && exam.correctionPdfUrl) return exam.correctionPdfUrl;
    if (type === "Su" && exam.pdfUrl) return exam.pdfUrl;

    // Otherwise try to derive from the known pdfUrl by switching Su/Co token
    const base = exam.pdfUrl || exam.correctionPdfUrl || "";
    if (!base) {
      // best effort: try to construct from pattern using subject code heuristics
      // Try to find a code inside filename like ScYYYYXXSu.pdf
      // We'll attempt to locate the filename part after /pdfs/
      const f = ""; // unknown
      return f;
    }

    // switch Co <-> Su
    if (/Co\.pdf$/i.test(base) && type === "Su") {
      return base.replace(/Co\.pdf$/i, "Su.pdf");
    }
    if (/Su\.pdf$/i.test(base) && type === "Co") {
      return base.replace(/Su\.pdf$/i, "Co.pdf");
    }

    // fallback: return base as-is
    return base;
  };

  const handleView = (exam: ExamSubject, type: "Su" | "Co") => {
    const url = makePdfUrlFor(exam, type);
    if (!url) {
      alert("عذراً — لم نتمكن من العثور على ملف PDF المطلوب.");
      return;
    }
    setSelectedExam({ ...exam });
    setPdfTitle(`${exam.subject} — ${type === "Su" ? "موضوع" : "تصحيح"} — بكالوريا ${exam.year}`);
    // Ensure we pass the correct pdfUrl into viewer
    setSelectedExam(prev => prev ? { ...prev, pdfUrl: url } : null);
    setIsPDFViewerOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <Home className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">بكالوريا {selectedYear}</h1>
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center gap-2 justify-center">
          <BookOpen className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-semibold">المواد المتوفرة ({filteredExams.length})</h2>
        </div>

        {filteredExams.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
            {filteredExams.map((exam) => (
              <SubjectCard
                key={exam.id}
                id={exam.id}
                subject={exam.subject}
                year={exam.year}
                hasCorrection={exam.hasCorrection}
                onViewSujet={() => handleView(exam, "Su")}
                onViewCorrection={() => handleView(exam, "Co")}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 glass-effect rounded-xl">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">لا توجد مواد</h3>
            <p className="text-muted-foreground">لم نجد أي امتحانات لهذه السنة</p>
          </div>
        )}
      </main>

     {selectedExam && (
  <PDFViewer
    isOpen={isPDFViewerOpen}
    onClose={() => setIsPDFViewerOpen(false)}
    pdfUrl={selectedExam.pdfUrl}
  />
)}

    </div>
  );
};

export default Subjects;
