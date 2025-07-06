"use client";
import Toast from "@/components/Toast";

import ConfirmDialog from "@/components/ConfirmDialog";
import { motion } from "framer-motion";
import { jsPDF } from "jspdf";
import {
  ArrowLeft, Download, Maximize2,
  Minimize2, Pencil
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  id: number;
  title: string;
  content: string;
  category: string;
  createdAt: string;
};

export default function SingleNoteView({
  id,
  title,
  content,
  category,
  createdAt,
}: Props) {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState(category);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "warning" } | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  

    const triggerToast = (message: string, type: "success" | "error" | "warning" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleEditConfirm = () => {
    setConfirmOpen(false);
    router.push(`/EditNote/${id}`);
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

    // ✅ Trigger toast after successful download
    triggerToast("✅ PDF downloaded successfully!", "success");
  } catch (err) {
    triggerToast("❌ Failed to generate PDF.", "error");
  }
};;
  return (
    <div className="min-h-screen px-4 py-6 bg-neutral-950 text-white w-full">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-white hover:text-indigo-400 hover:underline underline-offset-4 text-sm font-medium"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* Animated Note Card */}
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
           {/* Fullscreen Toggle */}
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
          <p className="text-sm text-neutral-400">{selectedCategory} • {createdAt}</p>
        </div>

        <div className="max-h-[500px] overflow-y-auto text-sm md:text-base text-neutral-200 whitespace-pre-wrap leading-relaxed pr-2">
          {content}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-end pt-4">
          {/* Download PDF */}
          <button
            onClick={handleDownloadPDF}
            className="shadow-[inset_0_0_0_2px_#616467] text-white px-4 py-2 rounded-full uppercase text-xs font-bold bg-transparent hover:bg-[#616467] transition duration-200"
          >
            <Download size={14} className="inline mr-1" />
            Download PDF
          </button>

          {/* Edit Button */}
          <button
            onClick={() => setConfirmOpen(true)}
            className="relative inline-flex h-8 sm:h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-slate-950 px-4 sm:px-5 text-[10px] sm:text-xs font-semibold uppercase text-white backdrop-blur-3xl gap-1 relative z-10">
              <Pencil size={12} />
              Edit Note
            </span>
          </button>
        </div>
      </motion.div>

      {/* Confirm Edit Dialog */}
      <ConfirmDialog
        isOpen={confirmOpen}
        message="Do you want to edit this note?"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleEditConfirm}
      />

      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}