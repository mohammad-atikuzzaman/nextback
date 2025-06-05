"use client";
import { FileKey, Mail, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import SignOutBtn from "./SignOutBtn";

const ProfileImage = ({session}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  if (session?.status !== "authenticated") {
    return <></>;
  }
  return (
    <div className="border-2 flex flex-col rounded-full border-indigo-500 p-0.5 relative">
      <Image
        src={session?.data?.user?.image}
        alt={session?.data?.user?.name}
        width={30}
        height={30}
        onClick={() => setShowProfileMenu(!showProfileMenu)}
        className="rounded-full"
      />
      {showProfileMenu && (
        <div className="absolute top-12 right-0 bg-gray-100 p-4 min-h-[90vh] drop-shadow">
          <ul>
            <li className="flex items-center gap-2 text-indigo-600 my-2 font-semibold">
              <User /> {session?.data?.user?.name}
            </li>
            <li className="flex items-center gap-2 text-indigo-600 my-2 font-semibold">
              <Mail />
              {session?.data?.user?.email}
            </li>
            <li className="flex items-center gap-2 text-indigo-600 my-2 font-semibold">
              <FileKey />
              {session?.data?.user?.role}
            </li>
            <li className="flex items-center gap-2 text-indigo-600 my-2 font-semibold">
              <Link
                className="bg-indigo-600 text-white w-full text-center p-1 rounded-md hover:bg-indigo-400 transition-all"
                href="/profile"
              >
                Profile
              </Link>
            </li>
            <SignOutBtn/>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileImage;
