import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

const Layout = async ({ children }) => {
  const session = await getServerSession()
  session?.user && redirect('/')
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      {/* Navigation */}
      <nav className="mb-6 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md flex gap-4 font-medium">
        <Link
          href="/"
          className="bg-white text-indigo-600 px-3 py-1 rounded-md hover:bg-gray-300 transition"
        >
          Home
        </Link>
        <Link
          href="/auth"
          className="bg-white text-indigo-600 px-3 py-1 rounded-md hover:bg-gray-300 transition"
        >
          Login
        </Link>
        <Link
          href="/auth/register"
          className="bg-white text-indigo-600 px-3 py-1 rounded-md hover:bg-gray-300 transition"
        >
          Register
        </Link>
      </nav>

      {/* Page Content */}
      <Suspense fallback={<div>Loading...</div>}>
        <main className="w-full max-w-md">{children}</main>
      </Suspense>
    </div>
  );
};

export default Layout;
