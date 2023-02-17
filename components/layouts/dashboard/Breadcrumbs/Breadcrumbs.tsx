"use client";

import Link from "next/link";
import { Home } from "lucide-react";
import { usePathname } from "next/navigation";

const BreadCrumbs: React.FC = () => {
  const pathname = usePathname();
  const parts = pathname?.split("/");

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </Link>
        </li>
        {pathname?.split("/").map(
          (path, i) =>
            path.length > 0 && (
              <li key={path}>
                <div className="flex items-center">
                  <svg
                    aria-hidden="true"
                    className="h-6 w-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <Link
                    href={`${parts?.slice(0, i + 1).join("/")}`}
                    // href={getPath(path)}
                    className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white md:ml-2"
                  >
                    {path.charAt(0).toUpperCase() + path.slice(1)}
                  </Link>
                </div>
              </li>
            ),
        )}
      </ol>
    </nav>
  );
};

export default BreadCrumbs;
