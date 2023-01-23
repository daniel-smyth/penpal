export interface ICompletionResponse {
  choices: { text: string }[];
}

export interface IImageResponse {
  data: {
    url: string;
  };
  errors?: any[];
}
