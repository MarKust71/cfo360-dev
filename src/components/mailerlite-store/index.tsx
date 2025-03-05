"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMailerlite } from "@/hooks/useMailerlite";

export const MailerliteStore = () => {
  const { data, resetData } = useMailerlite();

  return (
    <>
      <Textarea value={JSON.stringify(data)} readOnly={true} />

      <Button onClick={() => resetData()}>Reset</Button>
    </>
  );
};
