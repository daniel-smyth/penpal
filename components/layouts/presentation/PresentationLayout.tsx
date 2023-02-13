import React from "react";
import PresentationNavbar from "./PresentationNavbar";
import Footer from "./Footer";

const PresentationLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <PresentationNavbar />
      <main className="flex w-full flex-col items-center justify-center py-32">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default PresentationLayout;
