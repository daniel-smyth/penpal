"use client";

import React, { useState } from "react";
import { fetcher } from "@lib/fetcher";
import { useArticle } from "@lib/hooks";
import { IArticle, ITextQuery } from "@lib/database/models";
import { Input } from "@components/ui/server";

interface TextGeneratorProps {
  article: IArticle;
}

const TextGenerator: React.FC<TextGeneratorProps> = ({
  article: fallbackData,
}) => {
  const { article, mutate } = useArticle(fallbackData._id, { fallbackData });
  const [query, setQuery] = useState({ ...fallbackData.text.current });
  const [error, setError] = useState("");

  if (!article) {
    return <div>Loading...</div>;
  }

  const generateText = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { result } = await fetcher({
        url: "/api/ai/text",
        params: {
          input: query.input,
          articleId: article._id || "",
        },
      });
      setQuery({ ...result, input: "" });

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

  const onHistoryClick = async (query: ITextQuery) => {
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
    <div className="z-40">
      {article.text.history.map((query, i) => (
        <li key={i}>
          {/* <button onClick={() => onHistoryClick(query)}>{query.input}</button>
          <button onClick={() => onHistoryClick(query)}>
            {query.output.choices[0].text}
          </button> */}
        </li>
      ))}
      <div className="fixed bottom-0 left-0 right-0 flex h-44 items-center justify-center border-t border-gray-300 bg-gray-50 text-center dark:bg-gray-900 sm:left-64">
        <form onSubmit={generateText} className="w-8/12">
          <Input
            id="text-generator-input"
            label="Enter Prompt"
            type="text"
            value={query.input}
            onChange={(e) =>
              setQuery((query) => ({ ...query, input: e.target.value }))
            }
          />
        </form>
      </div>
      {/* <strong>
        Error: <p>{error}</p>
      </strong>

      <br />

      <strong>
        Current Output
        <p>{article.text.current.output.choices[0].text}</p>
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
      {article.text.history.map((query, i) => (
        <li key={i}>
          <button onClick={() => onHistoryClick(query)}>{query.input}</button>
        </li>
      ))} */}
    </div>
  );
};

export default TextGenerator;
