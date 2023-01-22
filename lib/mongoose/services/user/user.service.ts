import { User, IUser } from '@lib/mongoose/models';
import { UserRepository } from '@lib/mongoose/repositories';

class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository(User);
  }

  public async createUser(user: IUser): Promise<IUser> {
    return this.repository.create(user);
  }

  public async getUser(id: string): Promise<IUser | null> {
    return this.repository.findById(id);
  }

  public async getAllUsers(): Promise<IUser[]> {
    return this.repository.find({});
  }

  public async findUser(query: object): Promise<IUser | null> {
    return this.repository.findOne(query);
  }

  public async updateUser(id: string, update: object): Promise<IUser | null> {
    return this.repository.update(id, update);
  }

  public async deleteUser(id: string): Promise<IUser | null> {
    return this.repository.delete(id);
  }
}

const userService = new UserService();

export default userService;
