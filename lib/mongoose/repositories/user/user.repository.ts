import { Model } from 'mongoose';
import { IUser } from '@lib/mongoose/models';

export default class UserRepository {
  private user: Model<IUser>;

  constructor(userModel: Model<IUser>) {
    this.user = userModel;
  }

  public async create(user: IUser): Promise<IUser> {
    const newUser = new this.user(user);
    return newUser.save();
  }

  public async findById(id: string): Promise<IUser | null> {
    return this.user.findById(id);
  }

  public async findOne(query: object): Promise<IUser | null> {
    return this.user.findOne(query);
  }

  public async find(query: object): Promise<IUser[]> {
    return this.user.find(query);
  }

  public async update(id: string, update: object): Promise<IUser | null> {
    return this.user.findByIdAndUpdate(id, update, { new: true });
  }

  public async delete(id: string): Promise<IUser | null> {
    return this.user.findByIdAndDelete(id);
  }
}