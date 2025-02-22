import { db } from "@/app/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const picture = await db
    .selectFrom("user_pictures")
    .select("blob")
    .where("user_id", "=", Number((await params).userId))
    .executeTakeFirst();

  if (picture === undefined) {
    return new NextResponse(null, {
      status: 404,
    });
  }

  return new NextResponse(picture.blob);
}
