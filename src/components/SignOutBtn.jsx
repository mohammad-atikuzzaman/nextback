"use client";
import { signOut } from "next-auth/react";

export default function SignOutBtn() {
  return (
    <button
      className="bg-indigo-600 px-2 py-1 w-full rounded-md text-gray-200 hover:bg-indigo-400 transition-all"
      onClick={() => signOut({ callbackUrl: "/auth" })}
    >
      Logout
    </button>
  );
}
