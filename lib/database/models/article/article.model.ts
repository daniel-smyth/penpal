import mongoose, { Schema } from 'mongoose';
import { IImageQuery, ITextQuery } from '../query/query.model';

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
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100
  },
  text: {
    current: { type: Schema.Types.ObjectId, ref: 'Prompt' },
    history: [{ type: Schema.Types.ObjectId, ref: 'Prompt' }]
  },
  image: {
    current: { type: Schema.Types.ObjectId, ref: 'Prompt' },
    history: [{ type: Schema.Types.ObjectId, ref: 'Prompt' }]
  }
});

const Article =
  mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);

export default Article;
