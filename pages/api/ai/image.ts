import type { NextApiRequest, NextApiResponse } from "next";
import { articleService } from "@lib/database/services";
import { dbConnect } from "@lib/database/mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        const { input, articleId } = req.query;
        if (!articleId) {
          throw new Error("article is required to generate image");
        }
        const generatedImage = await articleService.generateAIImage(
          input as string,
          articleId as string,
        );
        res.status(200).json({ result: generatedImage });
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
