import { create } from "zustand";

import { MailerliteStoreState } from "@/stores/mailerlite-store/mailerlite-store.types";

export const useMailerliteStore = create<MailerliteStoreState>((set) => ({
  data: {},

  updateData: (newData) => {
    set({ data: newData });
  },
}));
