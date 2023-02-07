import { IImageQuery, ITextQuery } from "@lib/database/models";

export const mockTextQueries: ITextQuery[] = [
  {
    input: "test text input 1",
    output: {
      choices: [{ text: "test text output 1" }, { text: "test text output 2" }],
    },
  },
  {
    input: "test text input 2",
    output: {
      choices: [{ text: "test text output 3" }, { text: "test text output 4" }],
    },
  },
  {
    input: "test text input 3",
    output: {
      choices: [{ text: "test text output 5" }, { text: "test text output 6" }],
    },
  },
  {
    input: "test text input 4",
    output: {
      choices: [{ text: "test text output 7" }, { text: "test text output 8" }],
    },
  },
];

export const mockImageQueries: IImageQuery[] = [
  {
    input: "test text input 1",
    output: {
      data: { url: "test image output 1" },
    },
  },
  {
    input: "test text input 2",
    output: {
      data: { url: "test image output 2" },
    },
  },
  {
    input: "test text input 3",
    output: {
      data: { url: "test image output 3" },
    },
  },
  {
    input: "test text input 4",
    output: {
      data: { url: "test image output 4" },
    },
  },
];
