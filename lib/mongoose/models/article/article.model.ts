import mongoose, { Schema, Document } from 'mongoose';

export interface IArticle extends Document {
  title: string;
  text: string;
  image: string;
}

const ArticleSchema = new Schema({
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
    trim: true,
    minlength: 1
  },
  image: {
    type: String,
    required: true,
    trim: true
  }
});

const Article = mongoose.model<IArticle>('Article', ArticleSchema);

export default Article;
