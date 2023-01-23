import type { NextApiRequest, NextApiResponse } from 'next';
import { promptService } from '@lib/database/services';
import { openAiClient } from '@lib/openai';
import dbConnect from '@lib/database/mongoose';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const completion = await openAiClient.generateCompletion(
          req.query.prompt as string
        );
        if (req.query.articleId) {
          await promptService.create(
            {
              input: req.query.prompt as string,
              output: completion
            },
            req.query.articleId as string
          );
        }
        res.status(200).json({ result: completion });
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
