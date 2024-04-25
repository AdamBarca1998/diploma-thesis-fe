"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const Refresher = ({ 
    periodTimeMs
} : { 
    periodTimeMs: number
}) => {

  const router = useRouter();
  
  useEffect(() => {
    const intervalId = setInterval(() => {
        router.refresh();
    }, periodTimeMs);
  
    return () => {
        clearInterval(intervalId);
    };
  }, [periodTimeMs, router]);

  return null;
}