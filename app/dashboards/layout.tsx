import React from "react";
interface LandingLayoutProps {
  children: React.ReactNode;
}
const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <main className="h-[100vh] w-full overflow-auto  mt-1">{children}
    <h1>HELLO</h1>
    </main>
  );
};

export default LandingLayout;
