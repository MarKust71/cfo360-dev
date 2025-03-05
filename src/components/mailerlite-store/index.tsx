"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMailerlite } from "@/hooks/useMailerlite";

export const MailerliteStore = () => {
  const { data, updateData } = useMailerlite();

  return (
    <>
      <Textarea value={JSON.stringify(data)} readOnly={true} />

      <Button onClick={() => updateData({})}>Reset</Button>
    </>
  );
};
