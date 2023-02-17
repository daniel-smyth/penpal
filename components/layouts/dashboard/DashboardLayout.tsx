import { LucideIcon } from "lucide-react";
import BreadCrumbs from "./Breadcrumbs/Breadcrumbs";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";

export interface MenuItem {
  title: string;
  Icon: LucideIcon;
  href?: string; // Only applies if no dropdown items
  dropdownItems: { title: string; href: string }[];
}

export interface DashboardLayoutProps {
  menuItems: MenuItem[];
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
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
      <div className="absolute mt-20 w-full flex-col sm:pl-64">
        <div className="ml-4 mb-4 sm:ml-8">
          <BreadCrumbs />
        </div>
        {children}
      </div>
    </>
  );
};

export default DashboardLayout;
