const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  throw new Error(
    'Please define the OPENAI_API_KEY environment variable inside .env.local'
  );
}

interface OpenAICompletionResponse {
  choices: { text: string }[];
}

class OpenAIClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  public async generateCompletion(prompt: string): Promise<string> {
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
        const response = (await res.json()) as OpenAICompletionResponse;
        return response.choices[0].text;
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
