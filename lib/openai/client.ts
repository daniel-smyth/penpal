import fetcher from '@lib/fetcher';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  throw new Error(
    'Please define the OPENAI_API_KEY environment variable inside .env.local'
  );
}

export interface ICompletionResponse {
  choices: { text: string }[];
}

export interface IImageResponse {
  data: {
    url: string;
  };
  errors?: any[];
}

class OpenAIClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  public async generateCompletion(prompt: string, choiceCount = 1) {
    const response: ICompletionResponse = await fetcher({
      url: 'https://api.openai.com/v1/completions',
      method: 'POST',
      body: {
        model: 'text-davinci-003',
        prompt: prompt
      },
      headers: {
        Authorization: `Bearer ${this.apiKey}`
      }
    });

    response.choices = response.choices.slice(0, choiceCount);

    return response;
  }

  public async generateImage(prompt: string) {
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
