import { Model } from 'mongoose';
import { IArticle, Article } from '@lib/database/models';
import { ArticleRepository } from '@lib/database/repositories';
import { userService } from '@lib/database/services';
import { openAiClient } from '@lib/openai';

class ArticleService {
  private repository: ArticleRepository;

  constructor(model: Model<IArticle>) {
    this.repository = new ArticleRepository(model);
  }

  public async create(article: IArticle, userId?: string | null | undefined) {
    if (!userId) {
      return this.repository.create(article);
    }
    const user = await userService.get(userId);
    if (!user) {
      throw new Error('cannot create article for non-existent user');
    }
    const newArticle = await this.repository.create(article);
    user.articles.push(newArticle);
    await user.save();
    return newArticle;
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

  public async findMany(query: object) {
    return this.repository.find(query);
  }

  public async update(id: string, update: object) {
    return this.repository.update(id, update);
  }

  public async delete(id: string) {
    return this.repository.delete(id);
  }

  public async generateText(id: string, prompt: string, choiceCount = 1) {
    const output = await openAiClient.generateText(prompt, choiceCount);
    const article = await this.get(id);
    if (!article) {
      throw new Error('cannot find article to generate text for');
    }
    const record = { input: prompt, output };
    article.text.current = record;
    article.text.history.unshift(record);
    await article.save();
    return record;
  }

  public async generateImage(id: string, prompt: string) {
    const article = await this.get(id);
    if (!article) {
      throw new Error('cannot find article to generate image for');
    }
    const output = await openAiClient.generateImage(prompt);
    const record = { input: prompt, output };
    article.image.current = record;
    article.image.history.push(record);
    await article.save();
    return record;
  }
}

const articleService = new ArticleService(Article);

export default articleService;
