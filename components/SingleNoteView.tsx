"use client";

import { motion } from "framer-motion";
import { jsPDF } from "jspdf";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Download,
  Pencil,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  title: string;
  content: string;
  category: string;
  createdAt: string;
};

export default function SingleNoteView({
  title,
  content,
  category,
  createdAt,
}: Props) {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState(category);
  const [selectedAI, setSelectedAI] = useState("Groq");

const handleDownloadPDF = () => {
  const doc = new jsPDF();

  // ➤ Set bold font for title (use built-in bold font)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);

  // ➤ Calculate center X position for the title
  const pageWidth = doc.internal.pageSize.getWidth();
  const titleText = title || "Note";
  const textWidth = doc.getTextWidth(titleText);
  const centerX = (pageWidth - textWidth) / 2;

  doc.text(titleText, centerX, 20); // Title at Y=20

  // ➤ Set normal font for content
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  // ➤ Wrap and print content below title
  const splitContent = doc.splitTextToSize(content, 180);
  doc.text(splitContent, 10, 35); // Content at Y=35

  doc.save(`${titleText}.pdf`);
};

  return (
    <div className="min-h-screen px-4 py-6 bg-neutral-950 text-white w-full">
      {/* 🔙 Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-white hover:text-indigo-400 hover:underline underline-offset-4 text-sm font-medium"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* 💡 Animated Note Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="max-w-4xl mx-auto bg-neutral-900 rounded-2xl border border-neutral-800 shadow-2xl p-6 md:p-10 space-y-6"
      >
        <div className="space-y-1">
          <h1 className="text-xl md:text-2xl font-bold text-indigo-400">
            {title}
          </h1>
          <p className="text-sm text-neutral-400">
            {selectedCategory} • {createdAt}
          </p>
        </div>

        <div className="text-sm md:text-base text-neutral-200 whitespace-pre-wrap leading-relaxed">
          {content}
        </div>

        {/* 🔽 Dropdowns */}
        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-neutral-800">
          {/* Category Dropdown */}
          <div className="relative w-44">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs px-2 py-2 pr-6 rounded bg-neutral-800 border border-neutral-700 text-white w-full appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Engineering Student">Engineering Student</option>
              <option value="Medical Student">Medical Student</option>
              <option value="IT Professional">IT Professional</option>
              <option value="School Student">School Student</option>
              <option value="Finance Student">Finance Student</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
              <option value="Business">Business</option>
              <option value="Other">Other</option>
            </select>
            <ChevronDown
              className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
              size={14}
            />
          </div>

          {/* AI Model Dropdown */}
          <div className="relative w-44">
            <select
              value={selectedAI}
              onChange={(e) => setSelectedAI(e.target.value)}
              className="text-xs px-2 py-2 pr-6 rounded bg-neutral-800 border border-neutral-700 text-white w-full appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="Groq">Groq</option>
              <option value="Google Gemini">Google Gemini</option>
              <option value="Own Ai">Own Ai</option>
            </select>
            <ChevronDown
              className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
              size={14}
            />
          </div>
        </div>

        {/* 🧠 Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-end pt-4">
          {/* Download */}
       <button
  onClick={handleDownloadPDF}
  className="shadow-[inset_0_0_0_2px_#616467] text-white px-4 py-2 rounded-full tracking-wide uppercase text-xs font-bold bg-transparent hover:bg-[#616467] hover:text-white transition duration-200"
>
  <Download size={14} className="inline mr-1" />
  Download PDF
</button>
        <button className="px-8 py-2 rounded-full relative bg-slate-900 text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600"
            onClick={() => alert("Edit")}            
          >
            <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
            <Pencil size={12} className="inline mr-1" />
               <span className="relative z-20">Edit Note</span>
          </button>

          {/* Generate */}
          <button
            onClick={() => alert("Generate")}
            className="p-[1px] relative rounded-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-4 py-1 sm:px-6 sm:py-2 bg-black rounded-[6px] relative flex items-center gap-1 text-[10px] sm:text-xs font-semibold uppercase text-white hover:bg-transparent transition duration-200">
              <Sparkles size={12} />
              Generate
            </div>
          </button>

          {/* Submit */}
          <button
            onClick={() => alert("Submitted")}
            className="relative inline-flex h-8 sm:h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-slate-950 px-4 sm:px-5 text-[10px] sm:text-xs font-semibold uppercase text-white backdrop-blur-3xl gap-1">
              <Check size={12} />
              Submit
            </span>
          </button>

          {/* Edit */}
       
        </div>
      </motion.div>
    </div>
  );
}
