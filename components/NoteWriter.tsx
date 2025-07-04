"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowLeft,
    Check,
    ChevronDown,
    FileImage,
    FileText,
    Plus,
    Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

// Gradient words
const words = [
  {
    text: "✨",
    className:
      "!bg-gradient-to-r !from-purple-500 !via-violet-500 !to-pink-500 !bg-clip-text !text-transparent",
  },
  {
    text: "Build",
    className:
      "!bg-gradient-to-r !from-purple-500 !via-violet-500 !to-pink-500 !bg-clip-text !text-transparent",
  },
  {
    text: "Smarts",
    className:
      "!bg-gradient-to-r !from-purple-500 !via-violet-500 !to-pink-500 !bg-clip-text !text-transparent",
  },
  {
    text: "Ai",
    className:
      "!bg-gradient-to-r !from-purple-500 !via-violet-500 !to-pink-500 !bg-clip-text !text-transparent",
  },
  {
    text: "Notes",
    className:
      "!bg-gradient-to-r !from-purple-500 !via-violet-500 !to-pink-500 !bg-clip-text !text-transparent",
  },
];

export default function NoteWriter() {
  const router = useRouter();
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("General");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<"pdf" | "image" | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectFile = (type: "pdf" | "image") => {
    setFileType(type);
    setMenuOpen(false);
    setTimeout(() => fileInputRef.current?.click(), 100);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isPDF = file.type === "application/pdf";
    const isImage = file.type.startsWith("image/");

    if ((fileType === "pdf" && isPDF) || (fileType === "image" && isImage)) {
      setUploadedFile(file);
      alert(`${fileType?.toUpperCase()} uploaded: ${file.name}`);
    } else {
      alert(`Invalid file. Expected a ${fileType?.toUpperCase()} file.`);
    }

    e.target.value = ""; // Reset file input
  };

  const handleDownload = () => {
    if (!note.trim()) {
      alert("Note is empty.");
      return;
    }

    const blob = new Blob([note], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "note.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative z-10 px-4 pt-2 w-full">
      <div className="max-w-5xl w-full mx-auto px-2 sm:px-4">
        <div className="text-center">
          <TypewriterEffectSmooth
            className="text-2xl md:text-3xl font-bold text-center"
            words={words}
          />
        </div>

        {/* 🔙 Back Button */}
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={() => router.back()}
          className="mt-1 mb-2 flex items-center gap-2 text-white hover:text-indigo-400 hover:underline underline-offset-4 transition-all duration-200 text-sm font-medium"
        >
          <ArrowLeft size={18} />
          Back
        </motion.button>

        {/* Note Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 80 }}
          className="w-full p-10 md:p-12 bg-neutral-900 border dark:border-neutral-700 rounded-2xl shadow-xl text-white space-y-6"
        >
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Start typing your note..."
            rows={1}
            onInput={(e) => {
              const el = e.target as HTMLTextAreaElement;
              el.style.height = "auto";
              el.style.height = `${Math.min(el.scrollHeight, 300)}px`;
            }}
            className="w-full min-h-[100px] max-h-[300px] p-4 text-lg bg-neutral-800 border border-neutral-700 rounded-lg placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none overflow-auto transition-all duration-200"
          />

          <div className="flex justify-between items-center flex-wrap gap-4 relative">
            {/* Upload Button + Label */}
            <div className="flex items-center gap-2 relative">
              <div className="relative">
                <button
                  onClick={() => setMenuOpen((prev) => !prev)}
                  className="w-9 h-9 flex items-center justify-center bg-neutral-700 hover:bg-neutral-600 rounded-full transition"
                  title="Upload File"
                >
                  <Plus size={18} />
                </button>

                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 mt-2 w-40 bg-neutral-800 border border-neutral-700 rounded-md shadow-lg z-20"
                    >
                      <button
                        onClick={() => handleSelectFile("pdf")}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-neutral-700 transition"
                      >
                        <FileText size={16} />
                        Upload PDF
                      </button>
                      <button
                        onClick={() => handleSelectFile("image")}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-neutral-700 transition"
                      >
                        <FileImage size={16} />
                        Upload Image
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept={
                    fileType === "pdf"
                      ? "application/pdf"
                      : fileType === "image"
                      ? "image/*"
                      : ""
                  }
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              <span className="text-sm text-neutral-400 truncate max-w-[150px]">
                {uploadedFile ? uploadedFile.name : "Upload File"}
              </span>
            </div>

            {/* Dropdown & Buttons */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="text-sm px-3 py-2 pr-8 rounded-md bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                >
                  <option>Groq</option>
                  <option>Google Gemini</option>
                  <option>Own Ai </option>
                  
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" size={16} />
              </div>

          <button
  className="shadow-[inset_0_0_0_2px_#616467] text-black px-4 py-2 rounded-full tracking-wide uppercase text-xs font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
  onClick={handleDownload}
>
  ⬇️ Download
</button>



           <button onClick={() => alert("AI Generate")} className="p-[3px] relative rounded-lg">
  {/* Gradient Border */}
  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
  
  {/* Inner Button */}
  <div className="px-8 py-2 bg-black rounded-[6px] relative flex items-center gap-1 text-xs font-semibold uppercase text-white hover:bg-transparent transition duration-200">
    <Sparkles size={14} />
    Generate
  </div>
</button>


             <button
  onClick={() => alert("Submit")}
  className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
>
  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold uppercase text-white backdrop-blur-3xl gap-1">
    <Check size={14} />
    Submit
  </span>
</button>
              
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
