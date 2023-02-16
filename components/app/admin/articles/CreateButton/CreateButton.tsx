"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createArticle } from "@lib/api/article";
import { Button } from "@components/ui/server";

interface CreateButtonProps {
  children: React.ReactNode;
}

const CreateButton: React.FC<CreateButtonProps> = ({ children }) => {
  const [fetching, setFetching] = useState(false);
  const router = useRouter();

  const onClick = async () => {
    try {
      setFetching(true);
      const { _id } = await createArticle();
      router.push(`/article/${_id}/text`);
    } catch (err: any) {
      console.log(err);
      setFetching(false);
      throw new Error(err);
    }
  };

  return (
    <Button size="large" loading={fetching} onClick={onClick}>
      {children}
    </Button>
  );
};

export default CreateButton;
