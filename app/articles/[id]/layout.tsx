import { ArticleNavbar } from "@components/app/articles";

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="fixed h-screen w-full bg-gradient-to-br from-slate-100 via-slate-100 to-slate-200 dark:from-gray-600 dark:via-gray-800 dark:to-zinc-900" />
      <ArticleNavbar />
      <main className="fixed w-full flex-col pt-16 sm:pl-64">{children}</main>
    </>
  );
}
