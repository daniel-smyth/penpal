import { NextApiRequest, NextApiResponse } from 'next';
import { promptService } from '@lib/database/services';
import { dbConnect } from '@lib/database/mongoose';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const prompt = await promptService.get(req.query.id as string);
        if (!prompt) {
          return res.status(404).json({ message: 'prompt not found' });
        }
        res.status(200).json(prompt);
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    case 'POST':
      try {
        const prompt = await promptService.create(req.body);
        res.status(201).json(prompt);
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    case 'PUT':
      try {
        const prompt = await promptService.update(
          req.query.id as string,
          req.body
        );
        if (!prompt) {
          return res.status(404).json({ message: 'prompt not found' });
        }
        res.status(200).json(prompt);
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    case 'DELETE':
      try {
        const prompt = await promptService.delete(req.query.id as string);
        if (!prompt) {
          res.status(404).json({ message: 'prompt not found' });
        }
        res.status(200).json({ message: 'prompt deleted successfully' });
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
