import mongoose, { Schema } from 'mongoose';
import { ITextResponse, IImageResponse } from '@lib/openai';

export interface IQuery {
  input: string;
  output: ITextResponse | IImageResponse;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITextQuery extends IQuery {
  input: string;
  output: ITextResponse;
  createdAt?: Date;
  updatedAt?: Date;
}

export const TextQuerySchema = new Schema<ITextQuery>(
  {
    input: {
      type: String,
      required: true,
      minlength: 1
    },
    output: {
      choices: [{ text: String }]
    }
  },
  {
    timestamps: true
  }
);

export interface IImageQuery {
  input: string;
  output: IImageResponse;
  createdAt?: Date;
  updatedAt?: Date;
}

export const ImageQuerySchema = new Schema<IImageQuery>(
  {
    input: {
      type: String,
      required: true,
      minlength: 1
    },
    output: {
      data: {
        url: String
      },
      errors: []
    }
  },
  {
    timestamps: true
  }
);

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
}

const ArticleSchema = new Schema<IArticle>({
  title: {
    type: String,
    maxlength: 20
  },
  text: {
    current: {
      input: String,
      output: {
        choices: [{ text: String }]
      }
    },
    history: [{ type: TextQuerySchema }]
  },
  image: {
    current: {
      input: String,
      output: {
        data: { url: String },
        errors: [{ type: Schema.Types.Mixed }]
      }
    },
    history: [{ type: ImageQuerySchema }]
  }
});

const Article =
  mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);

export default Article;
