import mongoose, { Schema } from 'mongoose';
import { ITextResponse, IImageResponse } from '@lib/openai';

export interface IQuery {
  input: string;
  output: ITextResponse | IImageResponse;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITextQuery extends IQuery {
  output: ITextResponse;
}

export interface IImageQuery extends IQuery {
  output: IImageResponse;
}

const QuerySchema = new Schema(
  {
    input: {
      type: String,
      required: true,
      minlength: 1
    },
    output: {
      type: Schema.Types.Mixed,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Query =
  mongoose.models.Query || mongoose.model<IQuery>('Query', QuerySchema);

export default Query;
