import { ArticleNavbar } from "@components/app/articles";

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100 dark:from-gray-600 dark:via-gray-800 dark:to-zinc-900" />
      <ArticleNavbar />
      <main className="flex w-full flex-col pt-16 sm:pl-64">{children}</main>
    </>
  );
}
