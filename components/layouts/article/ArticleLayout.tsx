import { LucideIcon } from "lucide-react";
import { Navbar, Sidebar } from "@components/common";
import Breadcrumbs from "./Breadcrumbs";

export interface MenuItem {
  title: string;
  Icon: LucideIcon;
  dropdownItems: { title: string; href: string }[];
  href?: string; // Only applies if no dropdown items
}

export interface ArticleLayoutProps {
  menuItems: MenuItem[];
  children: React.ReactNode;
}

const ArticleLayout: React.FC<ArticleLayoutProps> = ({
  menuItems,
  children,
}) => {
  return (
    <>
      <div className="fixed h-screen w-full bg-gradient-to-br from-slate-100 via-slate-100 to-slate-200 dark:from-gray-600 dark:via-gray-800 dark:to-zinc-900" />
      <div className="fixed top-0 z-40 w-full bg-white/0 transition-all">
        <Navbar menuItems={menuItems} />
        <Sidebar menuItems={menuItems} />
      </div>
      <div className="absolute mt-16 w-full flex-col sm:pl-64">
        <div className="mx-4 my-4 sm:ml-8">
          <Breadcrumbs />
        </div>
        {children}
      </div>
    </>
  );
};

export default ArticleLayout;
