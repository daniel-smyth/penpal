import { MenuItem } from "../DashboardLayout";
import SidebarButton from "./SidebarButton";

export interface SidebarProps {
  menuItems: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems }) => {
  return (
    <aside className="top-17 fixed left-0 h-screen w-64 -translate-x-full border-r border-gray-300 transition-transform dark:border-gray-600 sm:translate-x-0">
      <ul className="h-full space-y-4 overflow-y-auto bg-gray-50 p-3 dark:bg-gray-800">
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
