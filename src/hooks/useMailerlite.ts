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

        if (isEmpty(data.webhookData)) return;
        console.log({ webhookData: data.webhookData });

        const isFromAutomation = Boolean(data.webhookData?.automation_step_id);

        if (isFromAutomation) {
          const { id, email, fields } = data.webhookData.subscriber;

          if (isEmpty(fields)) return;

          const { name, last_name: lastName, phone, tax } = fields;

          console.log({
            automation: { id, email, fields: { name, lastName, phone, tax } },
          });
          updateData({ id, email, fields: { name, lastName, phone, tax } });
        } else {
          const { id, email, fields } = data.webhookData;

          if (isEmpty(fields)) return;

          const { name, last_name: lastName, phone, tax } = fields;

          console.log({
            notAutomation: {
              id,
              email,
              fields: { name, lastName, phone, tax },
            },
          });
          updateData({ id, email, fields: { name, lastName, phone, tax } });
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
