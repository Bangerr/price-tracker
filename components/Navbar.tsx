import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="w-full">
      <nav className="nav flex justify-between items-center px-6 md:px-20 py-4">
        <Link href="/" className="flex items-center gap-1">
          <p className="text-[21px] text-secondary font-bold">Price Tracker</p>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
