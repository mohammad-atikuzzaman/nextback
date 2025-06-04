import clientPromise from "@/lib/mongodb";
import { hash } from "bcryptjs";

export async function POST(req) {
  const { name, email, password, image } = await req.json();

  console.log(name, email, password, image,"from server auth")

  if (!email || !password || !name) {
    return Response.json({ message: "All fields required" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const users = db.collection("users");

    const existing = await users.findOne({ email });
    if (existing) return Response.json({ message: "User already exists" }, { status: 409 });

    const hashedPassword = await hash(password, 10);

    await users.insertOne({
      name,
      email,
      image,
      password: hashedPassword,
      role: "user",
      createdAt: new Date(),
    });

    return Response.json({ message: "Registered successfully" }, { status: 201 });
  } catch {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
