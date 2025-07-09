// app/(Notes)/Delete/[id]/page.tsx
import SingleNoteView from "@/components/SingleNoteView";

export default async function Page({ params }: { params: { id: string } }) {
  const res = await fetch(`http://127.0.0.1:5000/show/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load note");
  }

  const note = await res.json();

  return (
    <SingleNoteView
      id={note.id}
      title={note.title}
      content={note.content}
      category={note.category}
      createdAt={note.created_at}
    />
  );
}
