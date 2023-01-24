import mongoose, { Schema } from 'mongoose';
import { IArticle } from '@lib/database/models';

export interface IUser {
  name: string;
  email: string;
  image: string;
  articles: IArticle[];
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: 1
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minlength: 1,
    maxlength: 100
  },
  image: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    minlength: 1
  },
  articles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Article'
    }
  ]
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
