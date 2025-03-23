/* eslint-disable react-hooks/exhaustive-deps */
import isEmpty from "lodash.isempty";
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

        const subscriber = data.webhookData.subscriber;

        if (isEmpty(subscriber)) {
          updateData({});

          return;
        }

        const { id, email, fields } = subscriber;

        if (isEmpty(fields)) return;

        const { name, last_name: lastName, phone, tax } = fields;

        if (DEBUG)
          console.log({ id, email, fields: { name, lastName, phone, tax } });
        updateData({ id, email, fields: { name, lastName, phone, tax } });
      } catch (error) {
        console.error(error);
      }
    };

    const interval = setInterval(fetchData, INTERVAL);

    return () => clearInterval(interval); // Sprzątanie interwału
  }, []);

  const resetData = async () => {
    const response = await fetch("/api/webhooks/mailerlite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "reset" }),
    });

    if (DEBUG) console.log(await response.json());
  };

  return { data, updateData, resetData };
};
