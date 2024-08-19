import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* Navbar */}
      {children}
      {/* footer */}
    </div>
  );
};

export default HomeLayout;
