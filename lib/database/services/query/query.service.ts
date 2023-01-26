import { Model } from 'mongoose';
import { IImageQuery, IQuery, ITextQuery, Query } from '@lib/database/models';
import { QueryRepository } from '@lib/database/repositories';
import { articleService } from '@lib/database/services';
import { openAiClient } from '@lib/openai';

class QueryService {
  private repository: QueryRepository;

  constructor(model: Model<IQuery>) {
    this.repository = new QueryRepository(model);
  }

  public async create(prompt: IQuery) {
    return this.repository.create(prompt);
  }

  public async createCompletion(
    prompt: string,
    articleId?: string,
    choiceCount = 1
  ) {
    const output = await openAiClient.generateCompletion(prompt, choiceCount);
    if (!articleId) {
      return this.create({ input: prompt, output });
    }
    const article = await articleService.get(articleId);
    if (!article) {
      throw new Error('cannot record prompt for non-existent article');
    }
    const promptRecord = await this.create({ input: prompt, output });
    article.text.history.push(promptRecord as ITextQuery);
    await article.save();
    return promptRecord;
  }

  public async createImage(prompt: string, articleId?: string) {
    const output = await openAiClient.generateImage(prompt);
    if (!articleId) {
      return this.create({ input: prompt as string, output });
    }
    const article = await articleService.get(articleId as string);
    if (!article) {
      throw new Error('cannot record prompt for non-existent article');
    }
    const promptRecord = await this.create({ input: prompt, output });
    article.image.history.push(promptRecord as IImageQuery);
    await article.save();
    return promptRecord;
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
}

const queryService = new QueryService(Query);

export default queryService;
