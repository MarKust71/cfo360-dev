/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import { useMailerliteStore } from "@/stores/mailerlite-store/mailerlite-store";

const DEBUG = process.env.DEBUG === "true";

export const useMailerlite = () => {
  const { data, updateData } = useMailerliteStore();

  const INTERVAL = (process.env.NEXT_PUBLIC_INTERVAL || 5000) as number;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/webhooks/mailerlite");
        const data = await response.json();

        if (DEBUG) console.log({ data });

        if (data.webhookData) {
          updateData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const interval = setInterval(fetchData, INTERVAL);

    return () => clearInterval(interval); // Sprzątanie interwału
  }, []);

  return { data, updateData };
};
