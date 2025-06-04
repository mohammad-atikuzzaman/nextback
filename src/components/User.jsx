import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import SignOutBtn from "./SignOutBtn";

export default async function User() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Please log in to access your profile.
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-gray-800 space-y-4">
      <div className="flex items-center gap-4">
        <Image
          src={session.user.image || "/default-avatar.png"}
          alt={session.user.name}
          width={48}
          height={48}
          className="rounded-full border"
        />
        <div>
          <h1 className="text-xl font-semibold">{session.user.name}</h1>
          <p className="text-sm text-gray-500">{session.user.email}</p>
        </div>
      </div>
      <div className="pt-2 border-t flex justify-between items-center">
        <p className="text-sm">
          <span className="font-medium">Role:</span>{" "}
          {session.user.role || "user"}
        </p>
        <SignOutBtn />
      </div>
    </div>
  );
}
