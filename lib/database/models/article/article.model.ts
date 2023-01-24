import mongoose, { Schema } from 'mongoose';
import { IPrompt } from '@lib/database/models';

export interface IArticle {
  title: string;
  text: {
    current: string;
    history: IPrompt[];
  };
  image: {
    current: string;
    history: IPrompt[];
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
      minlength: 1
    },
    history: [{ type: Schema.Types.ObjectId, ref: 'Prompt' }]
  },
  image: {
    current: {
      type: String,
      minlength: 1
    },
    history: [{ type: Schema.Types.ObjectId, ref: 'Prompt' }]
  }
});

const Article =
  mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);

export default Article;
