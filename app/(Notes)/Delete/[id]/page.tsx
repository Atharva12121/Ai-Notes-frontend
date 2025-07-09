"use client";

import SingleNoteViewWrapper from "@/components/SingleNoteViewWrapper";

export default function Page({ params }: { params: { id: string } }) {
  const id = parseInt(params.id); // Ensure `id` is a number
  return <SingleNoteViewWrapper id={id} />;
}
