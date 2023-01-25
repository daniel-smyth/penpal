import { getUser } from '@lib/auth';

export default async function ArticlesPage() {
  const user = await getUser();

  if (!user) {
    return <main>Not logged in</main>;
  }

  return (
    <main>
      Articles:
      {user.articles.map((article) => {
        return (
          <>
            <br />
            Title: {article.title}
            <br />
            Text: {article.text.current}
            <br />
            Text: {article.image.current}
            <br />
          </>
        );
      })}
    </main>
  );
}
