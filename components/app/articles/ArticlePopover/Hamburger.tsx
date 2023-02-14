"use client";

import React from "react";
import { Menu as MenuIcon } from "lucide-react";
import { useArticlePopover } from "@components/app/articles";

const ArticlePopoverHamburger: React.FC = () => {
  const { ArticlePopover, setShowArticlePopover } = useArticlePopover();

  return (
    <>
      <ArticlePopover />
      <MenuIcon
        onClick={() => setShowArticlePopover(true)}
        className="h-6 w-6"
        aria-hidden="true"
      />
    </>
  );
};

export default ArticlePopoverHamburger;
