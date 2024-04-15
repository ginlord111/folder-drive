import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { OrganizationSwitcher, UserButton, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
const Header = async () => {
  const user = await currentUser();
  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16 w-full">
      <header className="relative py-6">
        <MaxWidthWrapper>
          <div className="border-b-2 border-gray-200">
            <div className="flex h-17 items-center py-2">
              {/* FOR MOBILE VIEW */}
              <Link className="flex items-center" href={"/"}>
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
                  {user === null || !user ? (
                    <Link href="/dashboard/files">
                      <Button>Sign in</Button>
                    </Link>
                  ) : (
                    <div className="flex items-center gap-8 flex-row-reverse justify-center">
                        <UserButton />
                        <OrganizationSwitcher />
                    </div>
                  )}
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
