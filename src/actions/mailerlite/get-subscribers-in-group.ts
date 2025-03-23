import MailerLite, { SubscriberParams } from "@mailerlite/mailerlite-nodejs";

import { CustomError } from "@/actions/mailerlite/get-groups.types";

const mailerlite = new MailerLite({
  api_key: process.env.MAILERLITE_API_KEY || "",
});

export const getSubscribersInGroup = async (
  groupId: string,
  params: SubscriberParams
) => {
  try {
    const response = await mailerlite.groups.getSubscribers(groupId, params);
    console.log(response.data.data[0].fields);
  } catch (error) {
    if (error instanceof Error && (error as CustomError).response) {
      console.error((error as CustomError).response?.data);
    } else {
      console.error(error);
    }
  }
};
