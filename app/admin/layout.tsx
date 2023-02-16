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

  if (!user?.id) {
    return (
      <Provider>
        <AuthBlock />
      </Provider>
    );
  }

  await getArticles(user?.id);

  return <Provider>{children}</Provider>;
}
