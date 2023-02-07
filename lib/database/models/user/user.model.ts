import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";
import Stripe from "stripe";
import { IArticle } from "@lib/database/models";

export interface IUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  emailVerified?: boolean;
  image?: string | null;
  stripeId?: string;
  subscriptionId?: string;
  subscriptionStatus?: Stripe.Subscription.Status;
  articles: (ObjectId | IArticle)[];
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    minlength: 1,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    minlength: 1,
    maxlength: 100,
  },
  emailVerified: Boolean,
  image: {
    type: String,
    lowercase: true,
    trim: true,
    minlength: 1,
  },
  articles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Article",
    },
  ],
  stripeId: {
    type: String,
    index: true,
    unique: true,
    minlength: 1,
  },
  subscriptionId: {
    type: String,
    unique: true,
    trim: true,
    minlength: 1,
  },
  subscriptionStatus: {
    type: String,
    trim: true,
    minlength: 1,
  },
});

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
