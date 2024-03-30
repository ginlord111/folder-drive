import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center text-blue-500 justify-center h-full">
      {children}
    </div>
  );
};

export default AuthLayout;
