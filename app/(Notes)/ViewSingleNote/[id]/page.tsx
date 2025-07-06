"use client";

import SingleNoteView from "@/components/SingleNoteView";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Note = {
  id: number;
  title: string;
  content: string;
  category: string;
  created_at: string;
};

export default function ViewSingleNote() {
  const params = useParams();
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    const fetchNote = async () => {
      const res = await fetch(`http://127.0.0.1:5000/show/${params.id}`);
      const data = await res.json();
      setNote(data);
    };

    if (params.id) fetchNote();
  }, [params.id]);

  if (!note) return <p className="text-center text-white">Loading...</p>;

  return (
   
<main className="min-h-screen bg-neutral-950 flex flex-col !p-0 !m-0 w-full" >
  <BackgroundBeamsWithCollision className="flex-grow flex items-center justify-center !p-0 !m-0">
      <SingleNoteView
        title={note.title}
        content={note.content}
        category={note.category}
        createdAt={note.created_at}
      />
   
  </BackgroundBeamsWithCollision>
  </main>


  );
}
