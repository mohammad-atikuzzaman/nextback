// app/auth/verify-email/page.js
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleVerify = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`/api/verify-email?token=${token}`);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Verification failed");
      }
      setMessage("✅ Email verified successfully! Redirecting...");
      setTimeout(() => router.push("/auth"), 2000);
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md text-center max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
        {token ? (
          <>
            <p className="mb-4">Click the button below to verify your email.</p>
            <button
              onClick={handleVerify}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </>
        ) : (
          <p className="text-red-600">Invalid or missing token.</p>
        )}
        {message && <p className="mt-4">{message}</p>}
      </div>
    </div>
  );
}
