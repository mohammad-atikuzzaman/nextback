import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, body: content, author, email, photo } = body;

    if (!title || !content || !author || !email || !photo) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const posts = db.collection("posts");

    const result = await posts.insertOne({
      title,
      body: content,
      author,
      email,
      photo,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Post added", postId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Insert error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const client = await clientPromise;
  const db = client.db();
  const posts = db.collection("posts");
  const result = await posts.find().toArray();
  return NextResponse.json(result);
}
