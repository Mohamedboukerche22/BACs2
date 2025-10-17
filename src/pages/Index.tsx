import { useState } from "react";
import { Header } from "@/components/Header";
import { YearSelector } from "@/components/YearSelector";
import { SubjectCard } from "@/components/SubjectCard";
import { PDFViewer } from "@/components/PDFViewer";
import { examData, ExamSubject } from "@/data/examData";
import { BookOpen, GraduationCap } from "lucide-react";

const Index = () => {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExam, setSelectedExam] = useState<ExamSubject | null>(null);
  const [isPDFViewerOpen, setIsPDFViewerOpen] = useState(false);

  const filteredExams = examData
    .filter((exam) => exam.year === selectedYear)
    .filter((exam) =>
      searchQuery ? exam.subject.includes(searchQuery) : true
    );

  const handleViewExam = (exam: ExamSubject) => {
    setSelectedExam(exam);
    setIsPDFViewerOpen(true);
  };

  const stats = {
    totalExams: examData.length,
    totalYears: new Set(examData.map((e) => e.year)).size,
    totalSubjects: new Set(examData.map((e) => e.subject)).size,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={setSearchQuery} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <GraduationCap className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">مكتبة شاملة للبكالوريا</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            بنك امتحانات البكالوريا الجزائرية
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            مكتبة شاملة تحتوي على جميع امتحانات البكالوريا مع الحلول النموذجية من 2008 حتى 2024
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="glass-effect px-6 py-4 rounded-xl">
              <div className="text-3xl font-bold text-primary">{stats.totalExams}</div>
              <div className="text-sm text-muted-foreground">امتحان متوفر</div>
            </div>
            <div className="glass-effect px-6 py-4 rounded-xl">
              <div className="text-3xl font-bold text-accent">{stats.totalYears}</div>
              <div className="text-sm text-muted-foreground">سنة دراسية</div>
            </div>
            <div className="glass-effect px-6 py-4 rounded-xl">
              <div className="text-3xl font-bold text-primary">{stats.totalSubjects}</div>
              <div className="text-sm text-muted-foreground">مادة مختلفة</div>
            </div>
          </div>
        </div>

        {/* Year Selector */}
        <YearSelector selectedYear={selectedYear} onYearChange={setSelectedYear} />

        {/* Exams Grid */}
        <div className="mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold">
            المواد المتوفرة لسنة {selectedYear}
          </h2>
          <span className="text-sm text-muted-foreground">
            ({filteredExams.length} مادة)
          </span>
        </div>

        {filteredExams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
            {filteredExams.map((exam) => (
              <SubjectCard
                key={exam.id}
                subject={exam.subject}
                year={exam.year}
                hasCorrection={exam.hasCorrection}
                onView={() => handleViewExam(exam)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 glass-effect rounded-xl">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">لا توجد نتائج</h3>
            <p className="text-muted-foreground">
              لم نجد أي امتحانات تطابق بحثك
            </p>
          </div>
        )}
      </main>

      {/* PDF Viewer */}
      {selectedExam && (
        <PDFViewer
          isOpen={isPDFViewerOpen}
          onClose={() => setIsPDFViewerOpen(false)}
          title={`${selectedExam.subject} - بكالوريا ${selectedExam.year}`}
          pdfUrl={selectedExam.pdfUrl}
        />
      )}

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-border/50 bg-card/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="mb-2">© 2024 بنك البكالوريا الجزائرية - جميع الحقوق محفوظة</p>
          <p className="text-sm">
            يرجى إضافة ملفات PDF للامتحانات من المصادر الرسمية
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
