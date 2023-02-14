import ArticleNavbar from "./AdminNavbar";
import ArticleSidebar from "./AdminSidebar";

const ArticleLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <div className="fixed h-screen w-full bg-gradient-to-br from-slate-100 via-slate-100 to-slate-200 dark:from-gray-600 dark:via-gray-800 dark:to-zinc-900" />
      <div className="fixed top-0 z-40 w-full bg-white/0 transition-all">
        <ArticleNavbar />
        <ArticleSidebar />
      </div>
      <div className="fixed w-full flex-col pt-16 sm:pl-64">{children}</div>
    </>
  );
};

export default ArticleLayout;
