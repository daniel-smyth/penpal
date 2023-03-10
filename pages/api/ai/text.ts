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
        const { input, articleId, choiceCount = 1 } = req.query;
        if (!articleId) {
          throw new Error("article is required to generate text");
        }
        const generatedText = await articleService.generateAIText(
          input as string,
          articleId as string,
          Number(choiceCount),
        );
        res.status(200).json({ result: generatedText });
      } catch (err: any) {
        res.status(500).json({ message: err.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
