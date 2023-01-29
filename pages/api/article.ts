import { NextApiRequest, NextApiResponse } from 'next';
import { articleService } from '@lib/database/services';
import { dbConnect } from '@lib/database/mongoose';
import { getUser } from '@lib/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const user = await getUser({ req, res });

  switch (req.method) {
    case 'GET':
      try {
        const getAll = !req.query;
        if (getAll) {
          if (!user) {
            return res
              .status(401)
              .json({ message: 'sign in to get your articles' });
          }
          return res.status(200).json(user.articles);
        }
        const article = await articleService.get(req.query.id as string);
        if (!article) {
          return res.status(404).json({ message: 'article not found' });
        }
        res.status(200).json(article);
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    case 'POST':
      try {
        const article = await articleService.create(req.body, user?.id);
        res.status(201).json(article);
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    case 'PUT':
      try {
        const article = await articleService.update(
          req.query.id as string,
          req.body
        );
        if (!article) {
          return res.status(404).json({ message: 'article not found' });
        }
        res.status(200).json(article);
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    case 'DELETE':
      try {
        const article = await articleService.delete(req.query.id as string);
        if (!article) {
          res.status(404).json({ message: 'article not found' });
        }
        res.status(200).json({ message: 'article deleted successfully' });
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
