import mongoose, { Schema } from "mongoose";
import {
  ITextQuery,
  IImageQuery,
  TextQuerySchema,
  ImageQuerySchema,
} from "../query/query.model";

export interface IArticle {
  _id: string;
  title: string;
  text: {
    current: ITextQuery;
    history: ITextQuery[];
  };
  image: {
    current: IImageQuery;
    history: IImageQuery[];
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const ArticleSchema = new Schema<IArticle>(
  {
    title: {
      type: String,
      maxlength: 20,
    },
    text: {
      current: {
        input: String,
        output: {
          choices: [{ text: String }],
        },
      },
      history: [{ type: TextQuerySchema }],
    },
    image: {
      current: {
        input: String,
        output: {
          data: { url: String },
          errors: [{ type: Schema.Types.Mixed }],
        },
      },
      history: [{ type: ImageQuerySchema }],
    },
  },
  {
    timestamps: true,
  },
);

const Article =
  mongoose.models.Article || mongoose.model<IArticle>("Article", ArticleSchema);

export default Article;
