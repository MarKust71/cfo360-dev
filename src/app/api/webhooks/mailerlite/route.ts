"use server";

import { NextResponse } from "next/server";

import { Data } from "@/stores/mailerlite-store/mailerlite-store.types";

let webhookData: Data = {};

export async function POST(req: Request) {
  const response = await req.json();
  const { payload } = response;
  console.log("POST:", { payload });

  if (payload) {
    const { events } = payload;
    // const {
    //   payload: { events },
    // } = await req.json();

    console.log("POST:", { events });

    if (events) {
      const subscriberAddedToGroup = events.find(
        ({ type }: { type: string }) => type === "subscriber.added_to_group"
      );

      console.log("POST:", { subscriberAddedToGroup });

      webhookData = subscriberAddedToGroup;

      console.log("POST:", { webhookData });

      return new NextResponse(JSON.stringify(subscriberAddedToGroup), {
        status: 201,
      });
    } else {
      return new NextResponse(JSON.stringify({}), { status: 204 });
    }
  } else {
    return new NextResponse(JSON.stringify({}), { status: 204 });
  }
}

export async function GET() {
  return new NextResponse(JSON.stringify({ webhookData }), { status: 200 });
}
