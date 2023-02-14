import React from "react";
import PresentationNavbar from "./PresentationNavbar";
import Footer from "./Footer";

const PresentationLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100 dark:from-gray-600 dark:via-gray-800 dark:to-zinc-900" />
      <PresentationNavbar />
      <main className="flex w-full flex-col items-center justify-center py-32">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default PresentationLayout;
