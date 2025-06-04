"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Home, Shield, Users, LogIn, Book } from "lucide-react";

// Define menu items outside the component to prevent re-creation on render
const menuItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/dashboard", label: "Dashboard", icon: Shield },
  { path: "/dashboard/users", label: "Users", icon: Users },
  { path: "/dashboard/add-post", label: "Add Post", icon: Book },
];

const MOBILE_BREAKPOINT = 768;

const AdminNav = () => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Effect for detecting mobile screen and setting initial state
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    // Initial check
    checkScreen();
    window.addEventListener("resize", checkScreen);
    // Cleanup
    return () => window.removeEventListener("resize", checkScreen);
  }, []); // Empty dependency array means this runs once on mount and cleanup on unmount

  // Close sidebar if screen becomes non-mobile while expanded
  useEffect(() => {
    if (!isMobile && expanded) {
      setExpanded(false);
    }
  }, [isMobile, expanded]);

  // Memoized class string generator for navigation links
  const navLinkClass = useCallback(
    (path) =>
      `flex items-center gap-3 px-3 py-2 rounded-md transition-colors duration-150 whitespace-nowrap ${
        pathname === path
          ? "bg-blue-600 text-white font-semibold"
          : "text-blue-100 hover:bg-blue-600 hover:text-white"
      }`,
    [pathname] // Re-create only if pathname changes
  );

  // Memoized toggle icon
  const ToggleIcon = useMemo(() => (expanded ? X : Menu), [expanded]);

  // Dynamic classes for the main navigation container
  const navContainerClasses = useMemo(() => {
    let baseClasses =
      "top-0 left-0 min-h-screen z-50 bg-blue-800 text-white py-4 transition-all duration-300";
    let positionClass = "sticky"; // Default to sticky
    let widthClass;

    if (isMobile) {
      if (expanded) {
        widthClass = "w-48";
        positionClass = "fixed"; // Use fixed position when mobile menu is expanded for overlay
      } else {
        widthClass = "w-16";
      }
    } else {
      widthClass = "w-64"; // Desktop width
    }
    return `${baseClasses} ${positionClass} ${widthClass}`;
  }, [isMobile, expanded]);

  const handleLinkClick = useCallback(() => {
    if (isMobile && expanded) {
      setExpanded(false);
    }
  }, [isMobile, expanded]);

  return (
    <>
      <div className={navContainerClasses}>
        {/* Toggler - Only visible and functional on mobile */}
        {isMobile && (
          <button
            className="flex items-center justify-center w-full mb-6 text-blue-100 hover:text-white"
            onClick={() => setExpanded((prev) => !prev)}
            aria-label={expanded ? "Close sidebar" : "Open sidebar"}
            aria-expanded={expanded}
          >
            <ToggleIcon size={20} />
          </button>
        )}

        {/* Nav Links */}
        <nav className="flex flex-col gap-2 px-2">
          {menuItems.map(({ path, label, icon: IconComponent }) => (
            <Link
              key={path}
              href={path}
              onClick={handleLinkClick}
              className={navLinkClass(path)}
              aria-current={pathname === path ? "page" : undefined}
            >
              <IconComponent size={20} />
              {/* Show label if expanded or not on mobile */}
              {(expanded || !isMobile) && <span>{label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile when menu is expanded */}
      {isMobile && expanded && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden" // md:hidden to ensure it's only for mobile conceptually
          onClick={() => setExpanded(false)}
          aria-label="Close sidebar overlay"
        />
      )}
    </>
  );
};

export default AdminNav;
