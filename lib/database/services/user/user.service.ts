import { Model } from 'mongoose';
import { User, IUser } from '@lib/database/models';
import { UserRepository } from '@lib/database/repositories';

class UserService {
  private repository: UserRepository;

  constructor(model: Model<IUser>) {
    this.repository = new UserRepository(model);
  }

  public async create(user: IUser): Promise<IUser> {
    return this.repository.create(user);
  }

  public async get(id: string): Promise<IUser | null> {
    return this.repository.findById(id);
  }

  public async getAll(): Promise<IUser[]> {
    return this.repository.find({});
  }

  public async find(query: object): Promise<IUser | null> {
    return this.repository.findOne(query);
  }

  public async update(id: string, update: object): Promise<IUser | null> {
    return this.repository.update(id, update);
  }

  public async delete(id: string): Promise<IUser | null> {
    return this.repository.delete(id);
  }
}

const userService = new UserService(User);

export default userService;