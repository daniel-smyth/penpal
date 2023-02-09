import { ChevronDown as ChevronDownIcon, LucideIcon } from "lucide-react";

interface MultiLevelItemProps {
  title: string;
  Icon: LucideIcon;
  children?: { name: string; href: string }[];
}

const SidebarItem: React.FC<MultiLevelItemProps> = ({
  title,
  Icon,
  children = [],
}) => {
  return (
    <li>
      <button
        type="button"
        className="group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        aria-controls="dropdown-example"
        data-collapse-toggle="dropdown-example"
      >
        <Icon className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
        <span
          className="ml-3 flex-1 whitespace-nowrap text-left"
          sidebar-toggle-item
        >
          {title}
        </span>
        {children.length > 0 && (
          <ChevronDownIcon sidebar-toggle-item className="h-6 w-6" />
        )}
      </button>
      {children.length > 0 && (
        <ul id="dropdown-item" className="hidden space-y-2 py-2">
          {children.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarItem;
