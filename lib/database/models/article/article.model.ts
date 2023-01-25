import mongoose, { Schema } from 'mongoose';
import { IQuery } from '@lib/database/models';

export interface IArticle {
  _id: string;
  title: string;
  text: {
    current: string;
    history: IQuery[];
  };
  image: {
    current: string;
    history: IQuery[];
  };
}

const ArticleSchema = new Schema<IArticle>({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100
  },
  text: {
    current: {
      type: String,
      required: true,
      minlength: 1
    },
    history: [{ type: Schema.Types.ObjectId, ref: 'Prompt' }]
  },
  image: {
    current: {
      type: String,
      required: true,
      minlength: 1
    },
    history: [{ type: Schema.Types.ObjectId, ref: 'Prompt' }]
  }
});

const Article =
  mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);

export default Article;
