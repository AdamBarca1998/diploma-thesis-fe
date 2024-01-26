"use client";

import AddFab from "@/components/add-fab";
import { useServersContext } from "@/components/providers";
import { ServerDialog } from "@/components/server-dialog";
import { ServerForm } from "@/components/server-form";
import { useEffect } from "react";

export default function Home() {

  const [_, setServers] = useServersContext();

  useEffect(() => {
    
  }, [])

  return (
    <div className="mx-auto flex w-full max-w-screen-lg flex-col items-center justify-center gap-3 p-12 lg:p-0">
      <ServerDialog></ServerDialog>
    </div>
  );
}
