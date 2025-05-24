"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const menu = [
    {
      path: "/",
      show: "Home",
    },
    {
      path: "/about",
      show: "About",
    },
    {
      path: "/admin",   
      show: "Admin",
    },
    {
      path: "/posts",
      show: "Posts",
    },
    {
      path: "/auth",
      show: "Login",
    },
  ];

  const path = usePathname();
  console.log(path);
  if (path.includes("admin") || path.includes("auth")){
    return<></>
  }
    return (
      <nav className="flex items-center justify-between bg-gray-300 px-3 py-1 sticky top-0">
        <h2 className="text-3xl font-semibold">NextPrac</h2>
        <menu className="space-x-4">
          {menu.map((m, i) => (
            <Link key={i} href={m.path}>{m.show}</Link>
          ))}
        </menu>
      </nav>
    );
};

export default Navbar;
