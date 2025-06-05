import AdminNav from "@/components/AdminNav";
import { authOptions } from "@/lib/authOptions";
import SessionProviderWrapper from "@/utils/SessionProviderWrapper";
import { Home } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

const AdminLayout = async ({ children }) => {
  const session = await getServerSession(authOptions);
  if (session.user.role !== "admin") {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-center  bg-gradient-to-tr from-white to bg-indigo-200">
        <div>
          <Link
            className="flex justify-center items-center text-indigo-500 gap-2"
            href="/"
          >
            <Home />
            <span className=" text-xl">Back To home</span>
          </Link>
          <p className="text-2xl text-gray-700 mt-2">Only Admin Access Here</p>
        </div>
      </div>
    );
  }
  return (
    <SessionProviderWrapper>
      <main className="flex min-h-screen">
        <AdminNav />
        <section className="flex-1 bg-gradient-to-tr from-white to-indigo-200 p-2 overflow-auto">{children}</section>
      </main>
    </SessionProviderWrapper>
  );
};

export default AdminLayout;
