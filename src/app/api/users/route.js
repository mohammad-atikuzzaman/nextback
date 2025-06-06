import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }
  const client = await clientPromise;
  const db = client.db();
  const posts = db.collection("users");
  const result = await posts.find().toArray();
  return NextResponse.json(result);
}
