import type { NextApiRequest, NextApiResponse } from 'next';
import { articleService, promptService } from '@lib/database/services';
import { openAiClient } from '@lib/openai';
import { dbConnect } from '@lib/database/mongoose';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const { prompt, choiceCount = 1, articleId } = req.query;
        const output = await openAiClient.generateCompletion(
          prompt as string,
          Number(choiceCount)
        );
        if (articleId) {
          articleService.recordTextPrompt(articleId as string, {
            input: prompt as string,
            output
          });
        }
        res.status(200).json({ result: output });
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
