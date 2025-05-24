import Link from "next/link";
import React from "react";

const menu = [
  {
    path: "/",
    show: "Home",
  },
  {
    path: "/admin",
    show: "Admin",
  },
  {
    path: "/admin/users",
    show: "users",
  },
  { 
    path: "/auth",
    show: "Login",
  },
];

const layout = ({ children }) => {
  return (
    <main className="flex min-h-screen">
      <nav className="flex flex-col bg-blue-400 mon-h-screen w-1/12 ">
        {menu.map((m, i) => (
          <Link key={i} className="p-2" href={m.path}>{m.show}</Link>
        ))}
      </nav>
      {children}
    </main>
  );    
};

export default layout;
