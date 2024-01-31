"use client";

import { revalidateCaches } from "@/api-utils/cache";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

export default function RefreshCacheButton() {

  const router = useRouter();
  
  const handleClick = () => {
    revalidateCaches();
    router.refresh();
  };

  return (
    <Button variant="outlined" className="flex items-center gap-3" placeholder={undefined} onClick={handleClick}>
        Refresh

        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-5 w-5"
        >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
        />
        </svg>
    </Button>
  );
}