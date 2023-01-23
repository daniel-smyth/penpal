import { Model } from 'mongoose';
import { IPrompt } from '@lib/database/models';

export default class PromptRepository {
  private prompt: Model<IPrompt>;

  constructor(userModel: Model<IPrompt>) {
    this.prompt = userModel;
  }

  public async create(prompt: IPrompt) {
    const newPrompt = new this.prompt(prompt);
    return newPrompt.save();
  }

  public async findById(id: string) {
    return this.prompt.findById(id);
  }

  public async findOne(query: object) {
    return this.prompt.findOne(query);
  }

  public async find(query: object) {
    return this.prompt.find(query);
  }

  public async update(id: string, update: object) {
    return this.prompt.findByIdAndUpdate(id, update, { new: true });
  }

  public async delete(id: string) {
    return this.prompt.findByIdAndDelete(id);
  }
}
