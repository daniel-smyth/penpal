import { NextApiRequest, NextApiResponse } from 'next';
import { userService } from '@lib/database/services';
import { dbConnect } from '@lib/database/mongoose';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const user = await userService.get(req.query.id as string);
        if (!user) {
          return res.status(404).json({ message: 'user not found' });
        }
        res.status(200).json(user);
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    case 'POST':
      try {
        const user = await userService.create(req.body);
        res.status(201).json(user);
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    case 'PUT':
      try {
        const user = await userService.update(req.query.id as string, req.body);
        if (!user) {
          return res.status(404).json({ message: 'user not found' });
        }
        res.status(200).json(user);
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    case 'DELETE':
      try {
        const user = await userService.delete(req.query.id as string);
        if (!user) {
          return res.status(404).json({ message: 'user not found' });
        }
        res.status(200).json({ message: 'user deleted successfully' });
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
