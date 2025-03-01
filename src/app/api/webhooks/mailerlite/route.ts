import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const {
    payload: { events },
  } = await req.json();

  const subscriberAddedToGroup = events.find(
    ({ type }: { type: string }) => type === "subscriber.added_to_group"
  );

  // const {
  //   type,
  //   subscriber: {
  //     id: subscriberId,
  //     email,
  //     fields: { name },
  //   },
  //   group: { id: groupId },
  // } = subscriberAddedToGroup;
  //
  // const result = await addSubscriber(
  //   { email, mailerLiteId: subscriberId, name }
  // )
  //
  // if (result.error) {
  //   console.error({ error: result.error })
  //
  //   return new NextResponse(
  //     JSON.stringify({ error: result.error }), { status: 400 }
  //   )
  // }

  return new NextResponse(
    // JSON.stringify({ type, subscriberId, email, groupId, name }),
    JSON.stringify(subscriberAddedToGroup),
    { status: 201 }
  );
}
