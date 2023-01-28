import mongoose, { ObjectId, Schema } from 'mongoose';
import { ITextQuery, IQuery, IImageQuery } from '@lib/database/models';

export interface IArticle {
  _id?: string;
  title: string;
  text: {
    current: ITextQuery;
    history: (ObjectId | IQuery)[];
  };
  image: {
    current: IImageQuery;
    history: (ObjectId | IQuery)[];
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
    history: [{ type: Schema.Types.ObjectId, ref: 'Query' }]
  },
  image: {
    current: {
      input: String,
      output: {
        data: { url: String },
        errors: [{ type: Schema.Types.Mixed }]
      }
    },
    history: [{ type: Schema.Types.ObjectId, ref: 'Query' }]
  }
});

const Article =
  mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);

export default Article;
