import { Model } from 'mongoose';
import { IUser } from '@lib/database/models';

interface MongoFindOptions {
  populate?: string;
  limit?: number;
}

export default class UserRepository {
  private user: Model<IUser>;

  constructor(userModel: Model<IUser>) {
    this.user = userModel;
  }

  public async create(user: IUser) {
    const newUser = new this.user(user);
    return newUser.save();
  }

  public async findById(id: string, settings?: MongoFindOptions) {
    if (!settings) {
      return this.user.findById(id);
    }
    if (settings.populate) {
      return this.user.findById(id).populate(settings.populate);
    }
  }

  public async findOne(query: object) {
    return this.user.findOne(query);
  }

  public async find(query: object) {
    return this.user.find(query);
  }

  public async update(id: string, update: object) {
    return this.user.findByIdAndUpdate(id, update, { new: true });
  }

  public async delete(id: string) {
    return this.user.findByIdAndDelete(id);
  }
}
