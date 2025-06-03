"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (res.ok) {
      router.push("/auth");
    } else {
      setError(data.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col gap-5"
    >
      <input
        type="text"
        placeholder="Name"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Name"
      />
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
        Register
      </button>
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </form>
  );
};

export default RegisterPage;
