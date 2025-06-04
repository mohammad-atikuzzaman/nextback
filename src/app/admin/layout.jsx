import AdminNav from "@/components/AdminNav";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

const AdminLayout = async ({ children }) => {
  const session = await getServerSession(authOptions);
  if (session.user.role !== "admin") {
    return(
      <div>
        <Link href="/">back To home</Link>
        <p>Only Admin Access Here</p>
      </div>
    )
  }
  return (
    <main className="flex min-h-screen">
      <AdminNav />
      <section className="flex-1 bg-gray-100 p-4">{children}</section>
    </main>
  );
};

export default AdminLayout;
