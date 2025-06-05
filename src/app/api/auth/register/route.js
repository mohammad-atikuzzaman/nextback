// app/api/register/route.js
import { sendVerificationEmail } from "@/lib/mailer";
import clientPromise from "@/lib/mongodb";
import { hash } from "bcryptjs";
import crypto from "crypto";

export async function POST(req) {
  const { name, email, password, image } = await req.json();

  if (!email || !password || !name || !image) {
    return Response.json({ message: "All fields required" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const users = db.collection("users");

    const existing = await users.findOne({ email });
    if (existing)
      return Response.json({ message: "User already exists" }, { status: 409 });

    const hashedPassword = await hash(password, 10);
    const token = crypto.randomBytes(32).toString("hex");

    await users.insertOne({
      name,
      email,
      image,
      password: hashedPassword,
      role: "user",
      verified: false,
      verificationToken: token,
      createdAt: new Date(),
    });

    await sendVerificationEmail(email, token);

    return Response.json({ message: "Registered successfully" }, { status: 201 });
  } catch {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
