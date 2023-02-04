import { fetcher } from '@lib/fetcher';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY undefined. Please add to .env file.');
}

// A text response from OpenAI
// https://beta.openai.com/docs/api-reference/completions/create
export interface ITextResponse {
  choices: { text: string }[];
}

// An image response from OpenAI
// https://beta.openai.com/docs/api-reference/images/create
export interface IImageResponse {
  data: { url: string };
  errors?: any[];
}

class OpenAIClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  public async generateText(prompt: string, choiceCount = 1) {
    const mockResponse: ITextResponse = {
      choices: [{ text: prompt + ' I am AI output' }]
    };

    return mockResponse;

    const response: ITextResponse = await fetcher({
      url: 'https://api.openai.com/v1/completions',
      method: 'POST',
      body: {
        model: 'text-davinci-003',
        prompt
      },
      headers: {
        Authorization: `Bearer ${this.apiKey}`
      }
    });

    response.choices = response.choices.slice(0, choiceCount);

    return response;
  }

  public async generateImage(prompt: string) {
    const mockResponse: IImageResponse = {
      data: { url: prompt + ' I am AI output' }
    };

    return mockResponse;

    const response: IImageResponse = await fetcher({
      url: 'https://api.openai.com/v1/images/generations',
      method: 'POST',
      body: {
        model: 'image-alpha-001',
        prompt
      },
      headers: {
        Authorization: `Bearer ${this.apiKey}`
      }
    });

    return response;
  }
}

const openAiClient = new OpenAIClient(OPENAI_API_KEY);

export default openAiClient;
