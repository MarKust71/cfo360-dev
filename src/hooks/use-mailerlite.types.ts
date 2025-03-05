export type MailerliteSubscriber =
  | object
  | {
      id: number;
      email: string;
      fields: MailerliteSubscriberFields;
    };

type MailerliteSubscriberFields = {
  name: string;
  lastName: string;
  phone: string;
  tax: number;
};
