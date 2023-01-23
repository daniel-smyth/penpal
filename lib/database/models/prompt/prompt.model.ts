import mongoose, { Schema } from 'mongoose';

export interface IPrompt {
  input: string;
  output?: string;
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
      type: String,
      minlength: 1
    }
  },
  {
    timestamps: true
  }
);

const Prompt = mongoose.model<IPrompt>('Article', PromptSchema);

export default Prompt;
