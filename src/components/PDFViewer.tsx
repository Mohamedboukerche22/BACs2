import React from "react";

type PDFViewerProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  pdfUrl: string;
};

export const PDFViewer: React.FC<PDFViewerProps> = ({ isOpen, onClose, title, pdfUrl }) => {
  if (!isOpen) return null;

  // Ensure we have an absolute or relative URL; if the url is missing, show message.
  const url = pdfUrl || "";

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-900/95 text-white">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="px-3 py-1 rounded bg-red-600/90">إغلاق</button>
          <div className="text-sm whitespace-nowrap">{title}</div>
        </div>

        <div className="flex items-center gap-2">
          {url && (
            <a
              href={url}
              download
              className="px-3 py-1 rounded border border-white/10 hover:bg-white/5"
            >
              تحميل PDF
            </a>
          )}
        </div>
      </div>

      {/* PDF iframe fills remaining space */}
      <div className="flex-1">
        {url ? (
          <iframe
            src={url}
            title={title}
            className="w-full h-full"
            style={{ border: "none", height: "100vh" }}
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-white">
            <p>لم يتم توفير رابط PDF</p>
          </div>
        )}
      </div>
    </div>
  );
};
