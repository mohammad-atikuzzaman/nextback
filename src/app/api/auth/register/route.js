import { hash } from "bcryptjs";
import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return Response.json({ message: "All fields are required" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const users = client.db().collection("users");

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return Response.json({ message: "User already exists" }, { status: 409 });
    }

    const hashedPassword = await hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      role: "user",
      createdAt: new Date(),
    };

    await users.insertOne(newUser);

    return Response.json({ message: "Registration successful" }, { status: 201 });
  } catch (err) {
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}
