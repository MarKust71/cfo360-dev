"use client";

import { useMailerlite } from "@/hooks/useMailerlite";

export const MailerliteStore = () => {
  const { data } = useMailerlite();

  return (
    <>
      <div>{JSON.stringify(data)}</div>
    </>
  );
};
