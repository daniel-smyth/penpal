import { NextApiRequest, NextApiResponse } from 'next';
import { userService } from '@lib/database/services';
import { createJWT } from '@lib/auth';
import dbConnect from '@lib/database/mongoose';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  switch (req.method) {
    case 'POST':
      try {
        const { email, password } = req.body;
        if (!email || !password) {
          return res.status(400).json({ error: 'Missing email or password' });
        }
        const existingUser = await userService.find({ email });
        if (existingUser) {
          return res.status(409).json({ error: 'User already exists' });
        }
        const newUser = await userService.create(req.body);
        const token = createJWT(newUser);
        return res.status(201).json({ token });
      } catch (error: any) {
        return res.status(500).json({ error: error.message });
      }
    default:
      res.status(400).json({ success: false });
      break;
  }
}
