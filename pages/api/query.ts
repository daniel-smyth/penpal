import { NextApiRequest, NextApiResponse } from 'next';
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
        const query = await queryService.get(req.query.id as string);
        if (!query) {
          return res.status(404).json({ message: 'query not found' });
        }
        res.status(200).json(query);
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    case 'POST':
      try {
        const query = await queryService.create(req.body);
        res.status(201).json(query);
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    case 'PUT':
      try {
        const query = await queryService.update(
          req.query.id as string,
          req.body
        );
        if (!query) {
          return res.status(404).json({ message: 'query not found' });
        }
        res.status(200).json(query);
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    case 'DELETE':
      try {
        const query = await queryService.delete(req.query.id as string);
        if (!query) {
          res.status(404).json({ message: 'query not found' });
        }
        res.status(200).json({ message: 'query deleted successfully' });
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
