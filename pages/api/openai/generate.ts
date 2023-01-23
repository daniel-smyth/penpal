import type { NextApiRequest, NextApiResponse } from 'next';
import { openai } from '@lib/openai';
import { promptService } from '@lib/database/services';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      const query = req.query.prompt as string;
      const articleId = req.query.articleId as string;

      if (query.trim().length === 0) {
        res.status(400).json({
          error: { message: 'Please enter a valid prompt' }
        });
        return;
      }

      try {
        const completion = await openai.createCompletion({
          model: 'text-davinci-003',
          prompt: query,
          temperature: 0.6
        });

        if (articleId) {
          const prompt = {
            input: query,
            output: completion.data.choices[0].text
          };
          await promptService.create(prompt, articleId);
        }

        res.status(200).json({ result: completion.data.choices[0].text });
      } catch (error: any) {
        if (error.response) {
          console.error(error.response.status, error.response.data);
          res.status(error.response.status).json(error.response.data);
        } else {
          console.error(`Error with OpenAI API request: ${error.message}`);
          res.status(500).json({
            error: {
              message: 'An error occurred during your request.'
            }
          });
        }
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
