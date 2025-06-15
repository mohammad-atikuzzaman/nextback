import { getUserCollection } from "@/lib/dbCollections/getUserCollection";
import { sendResetPasswordEmail } from "@/lib/mailer";
import crypto from "crypto";

export async function POST(req) {
  const { email } = await req.json();
  const users = await getUserCollection();
  const user = await users.findOne({ email });
  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expiry = Date.now() + 1000 * 60 * 60; // 1 hour

  await users.updateOne(
    { email },
    { $set: { resetToken: token, resetTokenExpiry: expiry } }
  );

  await sendResetPasswordEmail(email, token);

  return Response.json({ message: "Reset link sent to your email." });
}
