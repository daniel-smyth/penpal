import { Model } from 'mongoose';
import { IPrompt, Prompt } from '@lib/database/models';
import { PromptRepository } from '@lib/database/repositories';
import { articleService } from '@lib/database/services';
import { openAiClient } from '@lib/openai';

class PromptService {
  private repository: PromptRepository;

  constructor(model: Model<IPrompt>) {
    this.repository = new PromptRepository(model);
  }

  public async create(prompt: IPrompt) {
    return this.repository.create(prompt);
  }

  public async get(id: string) {
    return this.repository.findById(id);
  }

  public async getAll() {
    return this.repository.find({});
  }

  public async find(query: object) {
    return this.repository.findOne(query);
  }

  public async update(id: string, update: object) {
    return this.repository.update(id, update);
  }

  public async delete(id: string) {
    return this.repository.delete(id);
  }

  public async generateCompletion(
    prompt: string,
    choiceCount = 1,
    articleId?: string
  ) {
    const output = await openAiClient.generateCompletion(prompt, choiceCount);
    if (!articleId) {
      return this.create({ input: prompt, output });
    }
    const article = await articleService.get(articleId);
    if (!article) {
      throw new Error('cannot record history for non-existent article');
    }
    const promptRecord = await this.create({ input: prompt, output });
    article.image.history.push(promptRecord);
    await article.save();
    return promptRecord;
  }

  public async generateImage(prompt: string, articleId?: string) {
    const output = await openAiClient.generateImage(prompt);
    if (!articleId) {
      return this.create({ input: prompt as string, output });
    }
    const article = await articleService.get(articleId as string);
    if (!article) {
      throw new Error('cannot record history for non-existent article');
    }
    const promptRecord = await this.create({ input: prompt, output });
    article.image.history.push(promptRecord);
    await article.save();
    return promptRecord;
  }
}

const promptService = new PromptService(Prompt);

export default promptService;
