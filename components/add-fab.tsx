"use client";

import { IconButton } from "@material-tailwind/react";

export default function AddFab({ 
  onClick 
} : {
  onClick: () => void
}) {

  return (
    <div className="fixed bottom-8 right-8">
        <IconButton className="rounded-full" size="lg" onClick={onClick} placeholder={undefined}>
            <i className="fas fa-plus" />
        </IconButton>
    </div>
  );
}
