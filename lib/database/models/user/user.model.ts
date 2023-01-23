import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { IArticle } from '../article/article.model';

export interface IUser extends Document {
  email: string;
  password: string;
  articles: Array<IArticle>;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minlength: 1,
    maxlength: 100
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    maxlength: 100
  },
  articles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Article'
    }
  ]
});

UserSchema.pre<IUser>('save', async function (next) {
  const user = this as IUser;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    throw err;
  }
};

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
