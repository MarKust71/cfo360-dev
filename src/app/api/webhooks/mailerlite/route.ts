"use server";

import { NextResponse } from "next/server";

import { Data } from "@/stores/mailerlite-store/mailerlite-store.types";

let webhookData: Data = {};

export async function POST(req: Request) {
  const {
    payload: { events },
  } = await req.json();

  const subscriberAddedToGroup = events.find(
    ({ type }: { type: string }) => type === "subscriber.added_to_group"
  );

  webhookData = subscriberAddedToGroup;

  return new NextResponse(JSON.stringify(subscriberAddedToGroup), {
    status: 201,
  });
}

export async function GET() {
  return new NextResponse(JSON.stringify({ webhookData }), { status: 200 });
}
