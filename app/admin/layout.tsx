import { getUser } from "@lib/auth";
import { getArticles } from "@lib/api";
import { AuthBlock } from "@components/layouts/dashboard";
import Provider from "./provider";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  await getArticles(user?.id!);

  return (
    <Provider>
      <>{!user ? <AuthBlock /> : children}</>
    </Provider>
  );
}
