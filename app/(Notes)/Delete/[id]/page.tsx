"use client";

import { motion } from "framer-motion";
import { jsPDF } from "jspdf";
import {
    ArrowLeft,
    Download,
    Maximize2,
    Minimize2,
    Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Toast from "@/components/Toast";

type Props = {
  id: number;
  title: string;
  content: string;
  category: string;
  createdAt: string;
};

export default function SingleNoteView({ id, title, content, category, createdAt }: Props) {
  const router = useRouter();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "warning" } | null>(null);

  const triggerToast = (message: string, type: "success" | "error" | "warning" = "success") => {
    setToast({ message, type });

    // Show toast for 3 seconds
    setTimeout(() => setToast(null), 3000);
  };

  const handleDeleteConfirm = async () => {
    setConfirmOpen(false);
    try {
      const res = await fetch(`http://127.0.0.1:5000/delete/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        triggerToast("✅ Note deleted successfully!", "success");

      } else {
        triggerToast("❌ Failed to delete note.", "error");
      }
    } catch (error) {
      triggerToast("❌ Server error. Please try again.", "error");
    }
  };

  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF();
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);

      const pageWidth = doc.internal.pageSize.getWidth();
      const titleText = title || "Note";
      const textWidth = doc.getTextWidth(titleText);
      const centerX = (pageWidth - textWidth) / 2;

      doc.text(titleText, centerX, 20);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      const splitContent = doc.splitTextToSize(content, 180);
      doc.text(splitContent, 10, 35);
      doc.save(`${titleText}.pdf`);

      triggerToast("✅ PDF downloaded successfully!", "success");
    } catch (err) {
      triggerToast("❌ Failed to generate PDF.", "error");
    }
  };

  return (
    <div className="min-h-screen px-4 py-6 bg-neutral-950 text-white w-full">
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-white hover:text-indigo-400 hover:underline underline-offset-4 text-sm font-medium"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className={`${
          isFullscreen
            ? "fixed inset-0 bg-neutral-800 p-6 overflow-y-auto z-50"
            : "max-w-4xl mx-auto"
        } bg-neutral-900 rounded-2xl border border-neutral-800 shadow-2xl p-6 md:p-10 space-y-6`}
      >
        <div className="flex justify-end">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="text-sm flex items-center gap-1 text-white hover:text-indigo-300 transition"
          >
            {isFullscreen ? (
              <>
                <Minimize2 size={16} /> Exit Fullscreen
              </>
            ) : (
              <>
                <Maximize2 size={16} /> Fullscreen
              </>
            )}
          </button>
        </div>

        <div className="space-y-1">
          <h1 className="text-xl md:text-2xl font-bold text-indigo-400">{title}</h1>
          <p className="text-sm text-neutral-400">{category} • {createdAt}</p>
        </div>

        <div className="max-h-[500px] overflow-y-auto text-sm md:text-base text-neutral-200 whitespace-pre-wrap leading-relaxed pr-2">
          {content}
        </div>

        <div className="flex flex-wrap gap-3 justify-end pt-4">
          <button
            onClick={handleDownloadPDF}
            className="shadow-[inset_0_0_0_2px_#616467] text-white px-4 py-2 rounded-full uppercase text-xs font-bold bg-transparent hover:bg-[#616467] transition duration-200"
          >
            <Download size={14} className="inline mr-1" />
            Download PDF
          </button>

          <button
            onClick={() => setConfirmOpen(true)}
            className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-xs font-semibold transition shadow"
          >
            <Trash2 size={14} /> Delete Note
          </button>
        </div>
      </motion.div>

      {/* Confirmation Dialog */}
   

      {/* Toast Message */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
