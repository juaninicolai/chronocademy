import { db } from "@/app/database";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

// Returns the same random avatar consistently for the given ID.
async function getAvatar(id: number) {
  const hash = crypto.createHash("sha256").update(id.toString()).digest("hex");
  const hashInt = BigInt(`0x${hash}`);
  const index = Number(hashInt % BigInt(4));
  return await readFile(
    path.join(process.cwd(), "/public/avatars", `${index + 1}.png`),
  );
}

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const userId = Number((await params).userId);

  const user = await db
    .selectFrom("users")
    .select("id")
    .where("id", "=", userId)
    .executeTakeFirst();

  if (user === undefined) {
    return new NextResponse(null, {
      status: 404,
    });
  }

  const picture = await db
    .selectFrom("user_pictures")
    .select("blob")
    .where("user_id", "=", userId)
    .executeTakeFirst();

  const blob = picture !== undefined ? picture.blob : await getAvatar(userId);

  return new NextResponse(blob);
}
