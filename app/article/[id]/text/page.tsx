import { LoadingPage, TextGenerator } from "@components/app/article";
import { getArticle } from "../layout";

async function ArticlePage({ params: { id } }: { params: { id: string } }) {
  const article = await getArticle(id);

  return <TextGenerator article={JSON.parse(JSON.stringify(article))} />;
  return (
    <div className="flex h-screen flex-col">
      <div className="flex-1 overflow-y-scroll">
        <ul className="max-h-4/5 h-full p-4">Hello</ul>
      </div>
      <div className="flex h-1/5 items-center justify-center">
        <input
          className="w-full max-w-xs rounded-md border px-4 py-2"
          type="text"
          placeholder="Enter text here"
        />
      </div>
    </div>
  );
  return <LoadingPage />;
}

export default ArticlePage;
