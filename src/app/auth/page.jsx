"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import GoogleLoginButton from "@/components/GoogleLoginButton";

const LoginPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (res.ok) {
      router.push("/");
    } else {
      setError(res.error || "Login failed");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Email"
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Password"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>

        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </form>

      <div className="flex items-center gap-3">
        <hr className="flex-grow border-gray-300" />
        <span className="text-gray-500 text-sm">or</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <GoogleLoginButton />
    </div>
  );
};

export default LoginPage;
