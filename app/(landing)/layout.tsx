import React from "react";
interface LandingLayoutProps {
  children: React.ReactNode;
}
const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <main className="h-[100vh] w-[100vw] overflow-auto  mt-1">
      {children}
    </main>
  );
};

export default LandingLayout;
