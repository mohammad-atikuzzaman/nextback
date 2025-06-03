"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (res.ok) {
      router.push("/");
    } else {
      setError("Login failed");
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col gap-6">
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

      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="w-full flex justify-center items-center gap-2 py-3 border border-gray-300 rounded-md hover:bg-gray-100 transition"
        aria-label="Sign in with Google"
      >
        {/* Optional: add Google icon here */}
        Sign in with Google
      </button>

      <p className="text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <a
          href="/register"
          className="text-blue-600 underline hover:text-blue-700"
        >
          Register
        </a>
      </p>
    </div>
  );
};

export default LoginPage;
