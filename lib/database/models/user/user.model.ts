import mongoose, { Schema } from 'mongoose';
import { ObjectId } from 'mongodb';
import { IArticle } from '@lib/database/models';

export interface IUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  emailVerified?: boolean;
  articles: (ObjectId | IArticle)[];
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    minlength: 1
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    minlength: 1,
    maxlength: 100
  },
  emailVerified: {
    type: String
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

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
