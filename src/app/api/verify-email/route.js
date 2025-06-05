// app/api/verify-email/route.js
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  const token = new URL(req.url).searchParams.get("token");
  if (!token)
    return NextResponse.json({ error: "Token missing" }, { status: 400 });

  const client = await clientPromise;
  const db = client.db();

  const user = await db
    .collection("users")
    .findOne({ verificationToken: token });
  if (!user)
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });

  await db
    .collection("users")
    .updateOne(
      { _id: user._id },
      { $set: { verified: true }, $unset: { verificationToken: "" } }
    );

  return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/auth`);
}
