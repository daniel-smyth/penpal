import mongoose, { Schema } from 'mongoose';
import { ICompletionResponse, IImageResponse } from '@lib/openai';

export interface IQuery {
  input: string;
  output: ICompletionResponse | IImageResponse;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITextQuery extends IQuery {
  output: ICompletionResponse;
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
  mongoose.models.Prompt ||
  mongoose.model<ITextQuery & IImageQuery>('Query', QuerySchema);

export default Query;
