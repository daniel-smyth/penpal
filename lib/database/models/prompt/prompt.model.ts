import { ICompletionResponse, IImageResponse } from '@lib/openai';
import mongoose, { Schema } from 'mongoose';

export interface IPrompt {
  input: string;
  output: ICompletionResponse | IImageResponse;
  createdAt?: Date;
  updatedAt?: Date;
}

const PromptSchema = new Schema(
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

const Prompt =
  mongoose.models.Prompt || mongoose.model<IPrompt>('Prompt', PromptSchema);

export default Prompt;
