"use server";

import { NextResponse } from "next/server";

import { Data } from "@/stores/mailerlite-store/mailerlite-store.types";

let webhookData: Data = {};

const AUTOMATION_STEP_ID = process.env.MAILERLITE_AUTOMATION_STEP_ID;
const AUTOMATION_EVENT_TYPE = "subscriber.added_to_group";
const DEBUG = process.env.DEBUG === "true";

export async function POST(req: Request) {
  const response = await req.json();
  if (DEBUG) console.log("POST:", { response });

  if (response) {
    const { action } = response;
    if (DEBUG) console.log("POST:", { action, webhookData });

    if (action === "reset") {
      webhookData = {};
      if (DEBUG) console.log("POST action:", { action, webhookData });

      return new NextResponse(
        JSON.stringify({ status: "success", message: "reset" }),
        { status: 200 }
      );
    }

    const { events } = response;
    if (DEBUG) console.log("POST:", { events });

    if (events) {
      const subscriberAddedToGroupAutomation = events.find(
        ({ automation_step_id }: { automation_step_id: string }) =>
          automation_step_id == AUTOMATION_STEP_ID
      );

      const subscriberAddedToGroup = events.find(
        ({ type }: { type: string }) => type === AUTOMATION_EVENT_TYPE
      );

      webhookData = subscriberAddedToGroupAutomation || subscriberAddedToGroup;

      return new NextResponse(JSON.stringify(webhookData), {
        status: 201,
      });
    } else {
      return new NextResponse(
        JSON.stringify({ status: "error", message: "no events array" }),
        { status: 404 }
      );
    }
  } else {
    return new NextResponse(
      JSON.stringify({ status: "error", message: "no data" }),
      { status: 404 }
    );
  }
}

export async function GET() {
  return new NextResponse(JSON.stringify({ webhookData }), { status: 200 });
}
