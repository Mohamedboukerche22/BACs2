import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getExam } from '../data/examData';
import PDFViewer from '../components/PDFViewer';

export default function ViewPDF() {
  const { year, subject, type } = useParams<{ year: string; subject: string; type: string }>();
  const navigate = useNavigate();
  const [pdfUrl, setPdfUrl] = useState<string>('');

  useEffect(() => {
    const exam = getExam(Number(year), subject || '');

    if (!exam) {
      navigate('/');
      return;
    }

    if (type === 'su') {
      setPdfUrl(exam.pdfUrl);
    } else if (type === 'co' && exam.correctionPdfUrl) {
      setPdfUrl(exam.correctionPdfUrl);
    } else {
      navigate(`/subjects/${year}`);
    }
  }, [year, subject, type, navigate]);

  if (!pdfUrl) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <PDFViewer
      pdfUrl={pdfUrl}
      onClose={() => navigate(`/pdfs/Sc2008AnCo.pdf`)}
    />
  );
}
