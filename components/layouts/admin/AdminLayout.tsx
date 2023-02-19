import { Navbar } from "@components/common";
import { Breadcrumbs } from "@components/ui/client";
import { LucideIcon, Sidebar } from "lucide-react";

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

const AdminLayout: React.FC<DashboardLayoutProps> = ({
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
        <div className="mx-4 mb-4 sm:ml-8">
          <Breadcrumbs />
        </div>
        {children}
      </div>
    </>
  );
};

export default AdminLayout;
