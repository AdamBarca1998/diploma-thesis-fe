"use client";

import { revalidateCacheByResourceType } from "@/api-utils/cache";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const Refresher = ({ 
    resourceType,
    periodTimeMs
} : { 
    resourceType: string,
    periodTimeMs: number
}) => {

  const router = useRouter();
  
  useEffect(() => {
    const intervalId = setInterval(() => {
        console.log("REFRESH");
        revalidateCacheByResourceType(resourceType);
        router.refresh();
    }, periodTimeMs);
  
    return () => {
        clearInterval(intervalId);
    };
  }, [periodTimeMs, resourceType, router]);

  return null;
}