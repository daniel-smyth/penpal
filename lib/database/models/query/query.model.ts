import { ICompletionResponse, IImageResponse } from '@lib/openai';
import mongoose, { Schema } from 'mongoose';

export interface IQuery {
  input: string;
  output: ICompletionResponse | IImageResponse;
  createdAt?: Date;
  updatedAt?: Date;
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
  mongoose.models.Prompt || mongoose.model<IQuery>('Query', QuerySchema);

export default Query;
