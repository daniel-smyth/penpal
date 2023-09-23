"use client";

import React, { useState } from "react";
import { fetcher } from "@lib/fetcher";
import { useArticle } from "@lib/hooks";
import { ArticleJoined } from "@app/api/articles/[id]/route";
import { ImageQuery } from "@prisma/client";

interface ImageGeneratorProps {
  article: ArticleJoined;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({
  article: fallbackData,
}) => {
  const { article, mutate } = useArticle(fallbackData.id, { 
    fallbackData 
  });
  const [query, setQuery] = useState({ 
    ...fallbackData.image_queries.at(0) ?? ''
  });
  const [error, setError] = useState("");

  if (!article) {
    return <div>Loading...</div>;
  }

  const generateImage = async () => {
    try {
      const { result } = await fetcher({
        url: "/api/ai/image",
        params: {
          input: query.input,
          articleId: article._id || "",
        },
      });
      setQuery(result);

      const newArticle = {
        ...article,
        image: {
          current: { ...result, input: "" },
          history: [result, ...article.image.history],
        },
      };

      mutate(newArticle, { optimisticData: newArticle });
    } catch (err: any) {
      console.log(err);
      setError(err.message);
    }
  };

  const onHistoryClick = async (query: ImageQuery) => {
    setQuery(query);

    const newArticle = {
      ...article,
      image: { ...article.image, current: query },
    };

    await fetcher({
      url: "/api/article",
      method: "PUT",
      params: { id: article._id || "" },
      body: newArticle,
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
        <p>{article.image_queries.at(0)?.output[0] ?? ''}</p>
      </strong>

      <br />

      <label htmlFor="image-generator-input">image-generator-input</label>
      <input
        id="image-generator-input"
        type="text"
        value={query.input}
        onChange={(e) =>
          setQuery((query) => ({ ...query, input: e.target.value }))
        }
      />

      <br />

      <button onClick={generateImage}>Generate Image</button>

      <br />

      <strong>History</strong>
      {article.image_queries.map((query, i) => (
        <li key={i}>
          <button onClick={() => onHistoryClick(query)}>{query.input}</button>
        </li>
      ))}
    </>
  );
};

export default ImageGenerator;
