import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
const Header = () => {
  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16 w-full">
      <header className="relative ">
        <MaxWidthWrapper>
          <div className="border-b-2 border-gray-200">
            <div className="flex h-17 items-center">
              {/* FOR MOBILE VIEW */}
              <Link className="sflex items-center" href={"/"}>
                <div className="relative pr-2">
                  <Image
                    src={"/folder-picture-iconn.png"}
                    width={30}
                    height={20}
                    alt="icon"
                    className="inline-block"
                  />
                </div>
                <div className="md:ml-4 lg:ml-0 hidden md:block">
                  Folder Drive
                </div>
              </Link>
              <div className="ml-auto flex ">
                <div className="hidden lg:flex  lg:space-x-5 ">
                  <Link href="/dashboard/files">
                    <Button>Sign in</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Header;
