import AdminNav from "@/components/AdminNav";
import { authOptions } from "@/lib/authOptions";
import { Home } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

const AdminLayout = async ({ children }) => {
  const session = await getServerSession(authOptions);
  if (session.user.role !== "admin") {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-center  bg-gradient-to-tr from-white to bg-indigo-300">
        <div>
          <Link className="flex justify-center text-indigo-500 gap-2" href="/">
            <Home />
            <span className=" font-semibold">Back To home</span> 
          </Link>
          <p className="text-2xl text-gray-700">Only Admin Access Here</p>
        </div>
      </div>
    );
  }
  return (
    <main className="flex min-h-screen">
      <AdminNav />
      <section className="flex-1 bg-gray-100 p-4">{children}</section>
    </main>
  );
};

export default AdminLayout;
