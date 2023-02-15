import { IArticle } from "@lib/database/models";

let articleCount = 0;

const makeArticle = (): IArticle => {
  const article = {
    _id: `${articleCount}`,
    title: `Test Title ${articleCount}`,
    text: {
      current: {
        input: "",
        output: {
          choices: [{ text: "" }],
        },
      },
      history: [
        {
          input: "Test Text Input 1",
          output: {
            choices: [
              { text: "Test Text Output 1" },
              { text: "Test Text Output 2" },
            ],
          },
        },
        {
          input: "Test Text Input 2",
          output: {
            choices: [
              { text: "Test Text Output 3" },
              { text: "Test Text Output 4" },
            ],
          },
        },
      ],
    },
    image: {
      current: {
        input: "",
        output: {
          data: { url: "" },
        },
      },
      history: [
        {
          input: "Test Image Input 1",
          output: { data: { url: "Test Image Output 1" } },
        },
        {
          input: "Test Image Input 2",
          output: { data: { url: "Test Image Output 2" } },
        },
      ],
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  articleCount += 1;

  return article;
};

export default makeArticle;
