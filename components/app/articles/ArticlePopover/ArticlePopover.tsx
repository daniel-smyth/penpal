"use client";

import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Popover } from "@components/ui/client";
import { ArticleNavList } from "@components/app/articles";

interface ArticlePopoverProps {
  showArticlePopover: boolean;
  setShowArticlePopover: Dispatch<SetStateAction<boolean>>;
}

const ArticlePopover: React.FC<ArticlePopoverProps> = ({
  showArticlePopover,
  setShowArticlePopover,
}) => {
  return (
    <aside id="mobile-sidebar" className="sm:hidden">
      <Popover
        content={
          <div className="space-y-4 border-b border-gray-200 bg-white px-2 pt-2 pb-6 dark:border-gray-600 dark:bg-gray-800 dark:text-white">
            <ArticleNavList />
          </div>
        }
        openPopover={showArticlePopover}
        setOpenPopover={setShowArticlePopover}
      />
    </aside>
  );
};

const useArticlePopover = () => {
  const [showArticlePopover, setShowArticlePopover] = useState(false);

  const ArticlePopoverCallback = useCallback(() => {
    return (
      <ArticlePopover
        showArticlePopover={showArticlePopover}
        setShowArticlePopover={setShowArticlePopover}
      />
    );
  }, [showArticlePopover, setShowArticlePopover]);

  return useMemo(
    () => ({
      setShowArticlePopover,
      ArticlePopover: ArticlePopoverCallback,
    }),
    [setShowArticlePopover, ArticlePopoverCallback],
  );
};

export default useArticlePopover;
