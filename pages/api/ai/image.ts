import type { NextApiRequest, NextApiResponse } from 'next';
import { queryService } from '@lib/database/services';
import { dbConnect } from '@lib/database/mongoose';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const { prompt, articleId } = req.query;
        const query = await queryService.createImage(
          prompt as string,
          articleId as string
        );
        res.status(200).json({ result: query });
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
