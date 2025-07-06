"use client";
import { useRouter } from "next/navigation"; // ✅ App Router

import ConfirmDialog from "@/components/ConfirmDialog"; // Custom confirmation component
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, Minimize2 } from "lucide-react";
import { useState } from "react";

type EditableNoteProps = {
  id: number;
  title: string;
  content: string;
  category: string;
  aiSource: string;
  created_at: string;
};

export default function EditableNote({
  id,
  title: initialTitle,
  content: initialContent,
  category: initialCategory,
  aiSource: initialAiSource,
  created_at,
}: EditableNoteProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [category, setCategory] = useState(initialCategory);
  const [aiSource, setAiSource] = useState(initialAiSource);
  const [lastUpdated, setLastUpdated] = useState(created_at);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [toast, setToast] = useState<{ message: string; success: boolean } | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const showToast = (message: string, success = true) => {
    setToast({ message, success });
    setTimeout(() => setToast(null), 3000);
  };

  const handleGenerate = () => {
    showToast("⚡ AI content generation is not yet implemented.", false);
  };

  const confirmSave = async () => {
    setShowConfirm(false);

    try {
      const res = await fetch(`http://127.0.0.1:5000/edit/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, category, aiSource }),
      });

      const data = await res.json();

      if (data.created_at) {
        setLastUpdated(data.created_at);
        showToast("✅ Note updated successfully!");
        setTimeout(() => router.push(`/ViewSingleNote/${id}`), 1000);
      } else {
        showToast("❌ Failed to update note.", false);
      }
    } catch (error) {
      console.error("Error updating note:", error);
      showToast("⚠️ Server error. Try again later.", false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className={`relative ${
    isFullscreen
      ? "fixed inset-0 z-50 w-full h-full overflow-y-auto p-6 bg-neutral-950 m-0"
      : "max-w-4xl mx-auto mt-10 p-6"
  } bg-neutral-900 text-white rounded-xl shadow-lg border border-neutral-700`}
    >
      {/* 🔙 Back + ⛶ Fullscreen Buttons */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => {
            if (isFullscreen) {
              setIsFullscreen(false);
            } else {
              router.back();
            }
          }}
          className="flex items-center gap-2 text-white hover:text-indigo-400 hover:underline underline-offset-4 text-sm font-medium"
        >
           {isFullscreen ?"": "← Back"}
        </button>

        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="text-sm flex items-center gap-1 text-white hover:text-indigo-300 transition"
        >
          {isFullscreen ? (
            <>
              <Minimize2 size={16} />
              Exit Fullscreen
            </>
          ) : (
            <>
              <Maximize2 size={16} />
              Fullscreen
            </>
          )}
        </button>
      </div>

      {/* ✅ Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`absolute top-4 right-4 px-4 py-2 rounded-md shadow-lg z-50 text-sm font-medium ${
              toast.success ? "bg-green-600" : "bg-red-500"
            } text-white`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Custom Confirm Dialog */}
      <ConfirmDialog
        isOpen={showConfirm}
        message="Do you want to update this note?"
        onCancel={() => setShowConfirm(false)}
        onConfirm={confirmSave}
      />

      <h1 className="text-2xl font-bold text-indigo-400 mb-4">Edit Note</h1>
      <p className="text-sm text-neutral-400 mb-6">
        🕒 Last Updated: {new Date(lastUpdated).toLocaleString()}
      </p>

      <input
        className="w-full p-3 mb-4 bg-neutral-800 rounded-md border border-transparent focus:border-indigo-500 focus:outline-none transition"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />

      <textarea
        className="w-full h-60 p-3 mb-6 bg-neutral-800 rounded-md border border-transparent focus:border-indigo-500 focus:outline-none transition"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
        <select
          className="p-2 text-sm bg-neutral-800 rounded-md border border-neutral-600 focus:border-indigo-500"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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

        <select
          className="p-2 text-sm bg-neutral-800 rounded-md border border-neutral-600 focus:border-indigo-500"
          value={aiSource}
          onChange={(e) => setAiSource(e.target.value)}
        >
          <option value="Groq">Groq</option>
          <option value="Google Gemini">Google Gemini</option>
          <option value="Own Ai">Own Ai</option>
        </select>

        <button className="p-[3px] relative" onClick={handleGenerate}>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
            Generate
          </div>
        </button>

        <button
          onClick={() => setShowConfirm(true)}
          className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            💾 Save
          </span>
        </button>
      </div>
    </motion.div>
  );
}
