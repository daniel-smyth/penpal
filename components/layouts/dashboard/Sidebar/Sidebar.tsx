import { Settings } from "lucide-react";
import { MenuItem } from "../DashboardLayout";
import SidebarButton from "./SidebarButton";

export interface SidebarProps {
  menuItems: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems }) => {
  return (
    <aside className="top-17 fixed left-0 h-screen w-64 -translate-x-full border-r border-gray-300 bg-gray-50 transition-transform dark:border-gray-600 dark:bg-gray-800 sm:translate-x-0">
      <ul className="flex h-full flex-col gap-2 overflow-y-auto p-3">
        <div className="border-b border-gray-300">
          <SidebarButton header href={""} dropdownItems={[]} Icon={Settings}>
            Administration
          </SidebarButton>
        </div>
        {menuItems.map((item) => (
          <SidebarButton
            key={item.title}
            href={item.href}
            dropdownItems={item.dropdownItems}
            Icon={item.Icon}
          >
            {item.title}
          </SidebarButton>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
