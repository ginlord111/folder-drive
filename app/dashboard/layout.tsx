import SideBar from "@/components/SideBar";
import React from "react";
interface LandingLayoutProps {
  children: React.ReactNode;
}
const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <div className="relative h-full w-full mt-[80px]">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 md:mt-[150px] bg-white">
        <SideBar />
      </div>
      {children}
    </div>
  );
};

export default LandingLayout;
