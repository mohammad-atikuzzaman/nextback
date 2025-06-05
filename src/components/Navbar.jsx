"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useMemo } from "react";
import { Menu, X } from "lucide-react";
import ProfileImage from "./ProfileImage";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const session = useSession();
  const menu = useMemo(
    () => [
      { path: "/", show: "Home" },
      { path: "/posts", show: "Posts" },
      { path: "/about", show: "About" },
      { path: "/dashboard", show: "Dashboard" },
    ],
    []
  );

  const path = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (path.startsWith("/dashboard") || path.startsWith("/auth")) return null;

  const linkClass = (linkPath) =>
    `block px-3 py-2 rounded-md transition-colors duration-200 ${
      path === linkPath
        ? "text-indigo-700 font-semibold bg-indigo-100"
        : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-br from-indigo-100 bg-indigo-50 shadow-md">
      <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-indigo-600 tracking-wide select-none cursor-default">
          NextPrac
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8 font-medium">
          {menu.map(({ path: linkPath, show }) => (
            <li key={linkPath}>
              <Link href={linkPath} className={linkClass(linkPath)}>
                {show}
              </Link>
            </li>
          ))}
          {session?.status === "authenticated" ? (
            <ProfileImage session={session} />
          ) : (
            <li>
              <Link
                href="/auth"
                className="bg-indigo-500 text-white px-3 py-2 rounded-md hover:bg-indigo-400 transition-all"
              >
                Login
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle Menu"
          aria-expanded={mobileOpen}
          className="md:hidden p-2 rounded-md text-indigo-600 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <ul
        className={`
          md:hidden fixed  top-[64px] right-0 w-full bg-white/90 backdrop-blur-sm shadow-inner flex flex-col space-y-2 px-5 py-4 border border-gray-200 min-h-screen
          transform transition-transform duration-300 ease-in-out
          ${
            mobileOpen
              ? "translate-y-0 opacity-100 pointer-events-auto"
              : "-translate-x-full opacity-0 pointer-events-none"
          }
        `}
      >
        {menu.map(({ path: linkPath, show }) => (
          <li key={linkPath}>
            <Link
              href={linkPath}
              onClick={() => setMobileOpen(false)}
              className={linkClass(linkPath)}
            >
              {show}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
