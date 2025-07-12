import Link from "next/link";
import React from "react";
import Image from "next/image";
import Navitems from "./Navitems";
import {
  SignInButton,
  
  UserButton,
  SignedIn,
  SignedOut,
  // SignIn,
} from "@clerk/nextjs";



const Navbar = () => {
  return (
    <nav className=" bg-gray-200 rounded-sm flex items-center justify-between mx-auto w-full px-14 py-4  max-sm:px-4">
      <Link href="/">
        <div className="flex items-center gap-2 cursor-pointer">
          <Image src="/images/logo.svg" alt="Logo" width={50} height={50} />
        </div>
      </Link>
      <div className="flex items-center gap-4">
        <Navitems />
        <SignedOut>
          <SignInButton>
            <button className="btn-signin">sign in</button>
          </SignInButton>
         
        </SignedOut>
        <SignedIn>
          <UserButton/>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
