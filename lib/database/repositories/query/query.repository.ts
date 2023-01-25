import { Model } from 'mongoose';
import { IQuery } from '@lib/database/models';

export default class QueryRepository {
  private prompt: Model<IQuery>;

  constructor(userModel: Model<IQuery>) {
    this.prompt = userModel;
  }

  public async create(prompt: IQuery) {
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
