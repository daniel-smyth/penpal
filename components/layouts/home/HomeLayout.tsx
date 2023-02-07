"use client";

import React from "react";
import Meta from "./Meta";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface HomeLayoutProps {
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
  children: React.ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ meta, children }) => {
  return (
    <>
      <Meta {...meta} />
      <Navbar />
      <main className="flex w-full flex-col items-center justify-center py-32">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default HomeLayout;
