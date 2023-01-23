import mongoose, { Schema } from 'mongoose';
import { IPrompt } from '@lib/database/models';

export interface IArticle {
  title: string;
  text: string;
  image: string;
  history: Array<IPrompt>;
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
    type: String,
    required: true,
    minlength: 1
  },
  image: {
    type: String,
    required: true,
    minlength: 1
  },
  history: {
    text: [{ type: Schema.Types.ObjectId, ref: 'Prompt' }],
    image: [{ type: Schema.Types.ObjectId, ref: 'Prompt' }]
  }
});

const Article = mongoose.model<IArticle>('Article', ArticleSchema);

export default Article;
