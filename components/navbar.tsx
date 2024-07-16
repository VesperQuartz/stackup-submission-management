"use client";
import { UserButton } from "@clerk/nextjs";
import { Authenticated } from "convex/react";
import Image from "next/image";
import Link from "next/link";

export const NavBar = () => {
  return (
    <nav className="flex p-3 justify-between drop-shadow-xl border-b items-center">
      <div>
        <h3>
          <Image
            src="https://stackup.dev/wp-content/uploads/2024/02/StackUp.svg"
            alt="Convex"
            width={100}
            height={100}
          />
        </h3>
      </div>
      <div className="flex space-x-2">
        <div className="hover:bg-black hover:text-white flex items-center drop-shadow-md p-2 rounded-xl">
          <Link href="/" className="font-bold">
            DashBoard
          </Link>
        </div>
        <div className="hover:bg-black hover:text-white flex items-center drop-shadow-md p-2 rounded-xl">
          <Link href="/tools" className="font-bold">
            Tools
          </Link>
        </div>
      </div>
      <div>
        <Authenticated>
          <UserButton />
        </Authenticated>
      </div>
    </nav>
  );
};
