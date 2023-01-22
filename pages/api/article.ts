import { NextApiRequest, NextApiResponse } from 'next';
import { articleService } from '@lib/mongoose/services';
import dbConnect from '@lib/mongoose/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const article = await articleService.getArticle(req.query.id as string);
        if (!article) {
          res.status(404).json({ message: 'article not found' });
        } else {
          res.status(200).json(article);
        }
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    case 'POST':
      try {
        const userId = req.user._id;
        const article = await articleService.createArticle(req.body, userId);
        res.status(201).json(article);
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    case 'PUT':
      try {
        const article = await articleService.updateArticle(
          req.query.id as string,
          req.body
        );
        if (!article) {
          res.status(404).json({ message: 'article not found' });
        } else {
          res.status(200).json(article);
        }
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    case 'DELETE':
      try {
        const article = await articleService.deleteArticle(
          req.query.id as string
        );
        if (!article) {
          res.status(404).json({ message: 'article not found' });
        } else {
          res.status(200).json({ message: 'article deleted successfully' });
        }
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
