import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@lib/database/mongoose';
import { userService } from '@lib/database/services';
import { createJWT } from '@lib/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  switch (req.method) {
    case 'POST':
      try {
        const { email, password } = req.body;
        const user = await userService.find({ email });
        if (!user) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }
        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }
        const token = createJWT(user);
        return res.status(200).json({ token });
      } catch (error: any) {
        return res.status(500).json({ error: error.message });
      }
    default:
      res.status(400).json({ success: false });
      break;
  }
}
