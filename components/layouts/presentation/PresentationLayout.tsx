import React from "next";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PresentationLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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

export default PresentationLayout;
