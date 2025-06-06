import { Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import React from "react";

const GoogleLoginButton = () => {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="w-full flex justify-center items-center gap-2 py-3 border font-semibold bg-[linear-gradient(to_right,#fb923c,#facc15,#22c55e,#3b82f6)] text-gray-100 border-gray-300 rounded-md"
      aria-label="Sign in with Google"
    >
      <Mail /> Sign in with Google
    </button>
  );
};

export default GoogleLoginButton;
