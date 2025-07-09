"use client";

import SingleNoteView from "@/components/SingleNoteView";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [note, setNote] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/show/${params.id}`);
        if (!res.ok) throw new Error("Failed to fetch note");
        const data = await res.json();
        setNote(data);
      } catch (err) {
        setError("❌ Failed to load note");
      }
    };

    fetchNote();
  }, [params.id]);

  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!note) return <div className="p-6 text-gray-400">Loading...</div>;

  return (
    <SingleNoteView
      id={parseInt(note.id)}
      title={note.title}
      content={note.content}
      category={note.category}
      createdAt={note.created_at}
    />
  );
}
