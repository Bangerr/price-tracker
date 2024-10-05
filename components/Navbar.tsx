import Image from "next/image";
import Link from "next/link";
import React from "react";
import userImage from "../public/assets/icons/user.svg";
import { Session } from "next-auth";
import { signIn, signOut } from "@/auth";

type Props = {
  session: Session | null;
};

function SignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}>
      <button
        type="submit"
        className="border border-black p-2 hover:bg-black hover:text-white hover:cursor-pointer transition duration-200">
        Sign in
      </button>
    </form>
  );
}

function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}>
      <button
        type="submit"
        className="border border-black p-2 hover:bg-black hover:text-white hover:cursor-pointer transition duration-200">
        Sign out
      </button>
    </form>
  );
}

const Navbar = async ({ session }: Props) => {
  const user = session?.user;
  return (
    <header className="w-full">
      <nav className="nav flex justify-between items-center px-6 md:px-20 py-4">
        <Link href="/" className="flex items-center gap-1">
          <p className="text-[21px] text-secondary font-bold">Price Tracker</p>
        </Link>
        <div className="relative group hover:cursor-pointer">
          <Image src={userImage} alt="user" />
          <div className="hidden group-hover:block absolute left-1/2 transform -translate-x-1/2 p-2 border rounded-md bg-[#FFFAFA] min-w-max">
            <p>Name: {user?.name}</p>
            <p>Emal: {user?.email}</p>

            {user ? (
              <div className="py-5">
                <SignOutButton />
              </div>
            ) : (
              <div className="px-6 md:px-20 py-5">
                <SignInButton />
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
