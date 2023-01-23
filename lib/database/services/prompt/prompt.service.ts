import { Model } from 'mongoose';
import { IPrompt, Prompt } from '@lib/database/models';
import { PromptRepository } from '@lib/database/repositories';

class PromptService {
  private repository: PromptRepository;

  constructor(model: Model<IPrompt>) {
    this.repository = new PromptRepository(model);
  }

  public async create(prompt: IPrompt): Promise<IPrompt> {
    return this.repository.create(prompt);
  }

  public async get(id: string): Promise<IPrompt | null> {
    return this.repository.findById(id);
  }

  public async getAll(): Promise<IPrompt[]> {
    return this.repository.find({});
  }

  public async find(query: object): Promise<IPrompt | null> {
    return this.repository.findOne(query);
  }

  public async update(id: string, update: object): Promise<IPrompt | null> {
    return this.repository.update(id, update);
  }

  public async delete(id: string): Promise<IPrompt | null> {
    return this.repository.delete(id);
  }
}

const promptService = new PromptService(Prompt);

export default promptService;
