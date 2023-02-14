import Link from "next/link";
import { SignInButton } from "@components/auth";
import {
  ArticlePopoverHamburger,
  ArticleNavList,
} from "@components/app/articles";
import { Button } from "@components/ui/server";

const navbar = [
  { name: "Why Penpal?", href: "#" },
  { name: "Tools & Guides", href: "#" },
];

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="fixed h-screen w-full bg-gradient-to-br from-slate-100 via-slate-100 to-slate-200 dark:from-gray-600 dark:via-gray-800 dark:to-zinc-900" />
      <div className="fixed top-0 z-40 w-full bg-white/0 transition-all">
        <nav className="flex h-16 items-center border border-gray-300 bg-gray-50 px-4 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:px-6 lg:px-8">
          <div className="absolute flex text-gray-400 sm:hidden">
            <ArticlePopoverHamburger />
          </div>

          <div
            id="navbar-items"
            className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
          >
            <Link href="/">
              <p className="font-display text-2xl">Penpal</p>
            </Link>

            <div className="hidden space-x-4 sm:ml-6 sm:flex">
              {navbar.map((item) => (
                <Button variant="flat" key={item.name}>
                  <Link href={item.href}>{item.name}</Link>
                </Button>
              ))}
            </div>
          </div>

          <div className="absolute right-0 pr-4 sm:pr-6 lg:pr-8">
            <SignInButton />
          </div>
        </nav>

        <aside
          id="desktop-sidebar"
          className="top-17 fixed left-0 h-screen w-64 -translate-x-full border-r border-gray-300 transition-transform dark:border-gray-600 sm:translate-x-0"
        >
          <ul className="h-full space-y-4 overflow-y-auto bg-gray-50 p-3 dark:bg-gray-800">
            <ArticleNavList />
          </ul>
        </aside>
      </div>
      <main className="fixed w-full flex-col pt-16 sm:pl-64">{children}</main>
    </>
  );
}
