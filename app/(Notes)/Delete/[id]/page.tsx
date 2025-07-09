// app/(Notes)/Delete/[id]/page.tsx
import SingleNoteView from "@/components/SingleNoteView";

async function getNote(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/show/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load note");
  }

  return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {
  const note = await getNote(params.id);

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
