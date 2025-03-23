"use server";

import MailerLite, { GetGroupsParams } from "@mailerlite/mailerlite-nodejs";

import { CustomError } from "@/actions/mailerlite/get-groups.types";

const mailerlite = new MailerLite({
  api_key: process.env.MAILERLITE_API_KEY || "",
});

export const getGroups = async (params: GetGroupsParams) => {
  try {
    const response = await mailerlite.groups.get(params);
    console.log(response.data);
  } catch (error) {
    if (error instanceof Error && (error as CustomError).response) {
      console.error((error as CustomError).response?.data);
    } else {
      console.error(error);
    }
  }
};
