import { MailerliteSubscriber } from "@/hooks/use-mailerlite.types";

export type Data = Record<string, unknown>;

export type MailerliteStoreState = {
  data: MailerliteSubscriber;
  updateData: (newData: MailerliteSubscriber) => void;
};
