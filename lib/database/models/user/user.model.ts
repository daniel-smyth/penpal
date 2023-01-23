import mongoose, { Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IArticle } from '@lib/database/models';

export interface IUser {
  email: string;
  password: string;
  articles: Array<IArticle>;
}

export interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
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

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
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

const User = mongoose.model<IUser, UserModel>('User', UserSchema);

export default User;
