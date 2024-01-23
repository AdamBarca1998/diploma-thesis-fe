"use client";

import AddFab from "@/components/add-fab";
import { ServerForm } from "@/components/server-form";

export default function Home() {
  const handleAddClick = () => {
    console.log('Add button clicked!');
  };

  return (
    <div className="mx-auto flex w-full max-w-screen-lg flex-col items-center justify-center gap-3 p-12 lg:p-0">
      <ServerForm />

      <AddFab onClick={handleAddClick}></AddFab>
    </div>
  );
}
