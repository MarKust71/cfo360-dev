export type Data = Record<string, unknown>;

export type MailerliteStoreState = {
  data: Data;
  updateData: (newData: Data) => void;
};
