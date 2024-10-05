import Image from "next/image";
import Link from "next/link";
import React from "react";
import user from "../public/assets/icons/user.svg";

const Navbar = () => {
  return (
    <header className="w-full">
      <nav className="nav flex justify-between items-center px-6 md:px-20 py-4">
        <Link href="/" className="flex items-center gap-1">
          <p className="text-[21px] text-secondary font-bold">Price Tracker</p>
        </Link>
        <Link href="/login">
          <Image src={user} alt="user" />
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
