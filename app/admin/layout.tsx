import { ArticleLayout } from "@components/layouts/admin";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ArticleLayout>{children}</ArticleLayout>;
}
