import { getUserCollection } from "@/lib/dbCollections/getUserCollection";
import { hash } from "bcryptjs";

export async function POST(req) {
  const { token, password } = await req.json();
  const users = await getUserCollection();

  const user = await users.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return Response.json(
      { error: "Invalid or expired token" },
      { status: 400 }
    );
  }

  const hashed = await hash(password, 10);
  await users.updateOne(
    { email: user.email },
    {
      $set: { password: hashed },
      $unset: { resetToken: "", resetTokenExpiry: "" },
    }
  );

  return Response.json({ message: "Password reset successful." });
}
