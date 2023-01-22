import type { NextApiRequest, NextApiResponse } from 'next';
import { openai } from '@lib/openai';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      const { prompt = '' } = req.query;

      if ((prompt as string).trim().length === 0) {
        res.status(400).json({
          error: {
            message: 'Please enter a valid prompt'
          }
        });
        return;
      }

      try {
        const completion = await openai.createCompletion({
          model: 'text-davinci-003',
          prompt: prompt,
          temperature: 0.6
        });
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
