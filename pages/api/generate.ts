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
        if (req.query._id) {
          const prompt = {
            input: req.query.prompt as string,
            output: completion
          };
          await promptService.create(prompt, req.query._id as string);
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
