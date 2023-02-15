"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { fetcher } from "@lib/fetcher";
import { Button } from "@components/ui/server";

interface CreateButtonProps {
  children: React.ReactNode;
}

const CreateButton: React.FC<CreateButtonProps> = ({ children }) => {
  const [fetching, setFetching] = useState(false);
  const router = useRouter();

  const createArticle = async () => {
    try {
      setFetching(true);
      const article = {
        title: "",
        text: {
          current: { input: "", output: { choices: [{ text: "" }] } },
          history: [],
        },
        image: {
          current: { input: "", output: { data: { url: "" } } },
          history: [],
        },
      };
      const { _id } = await fetcher({
        url: "/api/article",
        method: "POST",
        body: article,
      });
      router.push(`/article/${_id}/text`);
    } catch (err: any) {
      console.log(err);
      setFetching(false);
      throw new Error(err);
    }
  };

  return (
    <Button size="large" loading={fetching} onClick={createArticle}>
      {children}
    </Button>
  );
};

export default CreateButton;
