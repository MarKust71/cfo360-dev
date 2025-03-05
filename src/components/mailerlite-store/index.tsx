"use client";

import { Textarea } from "@/components/ui/textarea";
import { useMailerlite } from "@/hooks/useMailerlite";

export const MailerliteStore = () => {
  const { data } = useMailerlite();

  return (
    <>
      <Textarea value={JSON.stringify(data)} />
    </>
  );
};
