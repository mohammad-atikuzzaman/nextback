import AdminNav from "@/components/AdminNav";
import React from "react";

const AdminLayout = ({ children }) => {
  return (
    <main className="flex min-h-screen">
      <AdminNav />
      <section className="flex-1 bg-gray-100 p-4">{children}</section>
    </main>
  );
};

export default AdminLayout;
