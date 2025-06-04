"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { uploadImage } from "@/utils/uploadImage";

const RegisterPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    // photo: "",
  });
  const [error, setError] = useState("");
  console.log(loading);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // return console.log(form);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (res.ok) {
      router.push("/auth");
      setForm(false);
    } else {
      setError(data.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className=" flex flex-col gap-5">
        <input
          type="text"
          placeholder="Name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Name"
        />
        {/* <div className=" bg-indigo-500 hover:bg-indigo-600 pb-2 rounded-md flex flex-col-reverse">
        
          <input
            type="file"
            accept="image/*"
            id="photo"
            onChange={async (e) => {
              setLoading(true);
              try {
                const image = await uploadImage(e.target.files[0]);
                if (image) {
                  setForm({ ...form, photo: image });
                }
              } catch (err) {
                setError(err);
              } finally {
                setLoading(false);
              }
            }}
            className=" text-sm text-gray-700 w-1/2 mx-auto cursor-pointer"
          />

   
          <label
            htmlFor="photo"
            className="w-full p-2 rounded-md text-sm text-gray-100 flex items-center justify-center gap-2 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </label>
        </div> */}
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
          disabled={loading}
          className={`w-full text-white font-semibold py-3 rounded-md transition ${
            loading
              ? "bg-gray-300 text-gray-700"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          Register
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
    </div>
  );
};

export default RegisterPage;
