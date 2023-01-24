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

  public async generateCompletion(
    prompt: string,
    choiceCount: number
  ): Promise<ICompletionResponse> {
    try {
      let res: any = await fetch(
        'https://api.openai.com/v1/engines/davinci/completions',
        {
          body: JSON.stringify({
            prompt: prompt,
            api_key: this.apiKey
          })
        }
      );

      if (res.status === 200) {
        const response = (await res.json()) as ICompletionResponse;
        response.choices = response.choices.slice(0, choiceCount);
        return response;
      } else {
        res = await res.json();
        throw new Error(res.error);
      }
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }

  public async generateImage(prompt: string): Promise<IImageResponse> {
    try {
      let res: any = await fetch(
        'https://api.openai.com/v1/images/generations',
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`
          },
          body: JSON.stringify({
            model: 'image-alpha-001',
            prompt
          })
        }
      );

      if (res.status === 200) {
        const response = await res.json();
        return response;
      } else {
        res = await res.json();
        throw new Error(res.error);
      }
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}

const openAiClient = new OpenAIClient(OPENAI_API_KEY);

export default openAiClient;
