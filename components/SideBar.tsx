"use client";
import Link from "next/link";
import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { cn } from "@/lib/utils";
import { FileHeart, Trash, File } from "lucide-react";
import { usePathname } from "next/navigation";
const SideBar = () => {
  const pathname = usePathname();
  const sidebarMenu = [
    {
      name: "All files",
      icon: File,
      href: "/dashboard/files",
      pathname: pathname === "/dashboard/files",
    },
    {
      name: "Favorites",
      icon: FileHeart,
      href: "/dashboard/favorites",
      pathname: pathname === "/dashboard/favorites",
    },
    {
      name: "Trash",
      icon: Trash,
      href: "/dashboard/trash",
      pathname: pathname === "/dashboard/trash",
    },
  ];
  return (
    <MaxWidthWrapper>
      <div className="relative bg-white">
        <div className="flex flex-col gap-4 items-start">
          {sidebarMenu.map((menu, index) => (
            <Link
              href={menu.href}
              className={cn(
                "flex gap-2 p-3 w-full justify-start",
                menu.pathname && "text-blue-500"
              )}
              key={index}
            >
              <div className="flex items-center flex-1">
                <menu.icon className={cn("h-6 w-6 mr-3")} />
                {menu.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default SideBar;
