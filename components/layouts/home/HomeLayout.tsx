import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const HomeLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="flex w-full flex-col items-center justify-center py-14">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default HomeLayout;
