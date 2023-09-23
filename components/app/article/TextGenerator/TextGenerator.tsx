"use client";

import React, { useState } from "react";
import { fetcher } from "@lib/fetcher";
import { useArticle } from "@lib/hooks";
import { Article, TextQuery } from "@prisma/client";
import { ArticleJoined } from "@app/api/articles/[id]/route";

interface TextGeneratorProps {
  article: ArticleJoined;
}

const TextGenerator: React.FC<TextGeneratorProps> = ({
  article: fallbackData,
}) => {
  console.log((fallbackData))
  const { article, mutate } = useArticle(fallbackData.id, { 
    fallbackData
  });
  const [query, setQuery] = useState({ 
    ...fallbackData.text_queries.at(0) ?? ''
  });
  const [error, setError] = useState("");

  if (!article) {
    return <div>Loading...</div>;
  }

  const generateText = async () => {
    try {
      const { result } = await fetcher({
        url: "/api/ai/text",
        params: {
          input: query.input,
          articleId: article._id || "",
        },
      });
      setQuery(result);

      const newArticle = {
        ...article,
        text: {
          current: { ...result, input: "" },
          history: [result, ...article.text.history],
        },
      };

      mutate(newArticle, { optimisticData: newArticle });
    } catch (err: any) {
      console.log(err);
      setError(err.message);
    }
  };

  const onHistoryClick = async (query: TextQuery) => {
    setQuery(query);

    const newArticle = {
      ...article,
      text: { ...article.text, current: query },
    };

    await fetcher({
      url: "/api/article",
      method: "PUT",
      params: { id: article._id || "" },
      body: { ...article, text: { ...article.text, current: query } },
    });
    mutate(newArticle, { optimisticData: newArticle });
  };

  return (
    <>
      <strong>
        Error: <p>{error}</p>
      </strong>

      <br />

      <strong>
        Current Output
        <p>{article.text_queries.at(0)?.output[0] ?? ''}</p>
      </strong>

      <br />

      <label htmlFor="text-generator-input">text-generator-input</label>
      <input
        id="text-generator-input"
        type="text"
        value={query.input}
        onChange={(e) =>
          setQuery((query) => ({ ...query, input: e.target.value }))
        }
      />

      <br />

      <button onClick={generateText}>Generate Text</button>

      <br />

      <strong>History</strong>
      {article.text_queries.map((query, i) => (
        <li key={i}>
          <button onClick={() => onHistoryClick(query)}>{query.input}</button>
        </li>
      ))}
    </>
  );
};

export default TextGenerator;
