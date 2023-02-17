"use client";

import React, { MouseEventHandler, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown as ChevronDownIcon,
  ChevronUp as ChevronUpIcon,
  LucideIcon,
} from "lucide-react";
import { MenuItem } from "../DashboardLayout";
import { AnimatePresence, motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "@lib/theme";

interface SidebarButtonProps {
  href?: string; // Only if button is not a dropdown
  dropdownItems?: MenuItem["dropdownItems"];
  loading?: boolean;
  Icon?: LucideIcon;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  href = "",
  dropdownItems = [],
  loading = false,
  Icon,
  children,
  ...rest
}) => {
  const pathname = usePathname();
  const [dropdown, setDropdown] = useState(false);

  const hasDropdown = dropdownItems.length > 0;

  const logoButton = (
    <button
      {...rest}
      className="group flex w-full items-center rounded-lg px-6 py-4 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
      onClick={() => hasDropdown && setDropdown((value) => !value)}
    >
      {Icon && (
        <AnimatePresence>
          {loading ? (
            <motion.span
              className="spinner-grow spinner-sm inline-block"
              {...FADE_IN_ANIMATION_SETTINGS}
            >
              <svg
                className="h-6 w-6 animate-spin text-black dark:text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </motion.span>
          ) : (
            <motion.div {...FADE_IN_ANIMATION_SETTINGS}>
              <Icon className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      )}
      <span className="ml-4 inline-flex flex-1 items-center whitespace-nowrap text-left">
        {children}
      </span>
      {dropdownItems.length > 0 && (
        <div onClick={() => setDropdown((value) => !value)}>
          {!dropdown ? (
            <ChevronDownIcon className="h-6 w-6" />
          ) : (
            <ChevronUpIcon className="h-6 w-6" />
          )}
        </div>
      )}
    </button>
  );

  return (
    <>
      {hasDropdown ? (
        logoButton
      ) : (
        <Link
          href={href && pathname?.slice(0, pathname.lastIndexOf("/")) + href}
        >
          {logoButton}
        </Link>
      )}
      {hasDropdown &&
        dropdownItems.map((item) => (
          <ul key={item.title} className={`${!dropdown && `hidden`} space-y-2`}>
            <li>
              <Link
                href={item.href}
                className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                {item.title}
              </Link>
            </li>
          </ul>
        ))}
    </>
  );
};

export default SidebarButton;
