import { Model } from 'mongoose';
import { IArticle, Article } from '@lib/database/models';
import { ArticleRepository } from '@lib/database/repositories';
import { userService } from '@lib/database/services';

class ArticleService {
  private repository: ArticleRepository;

  constructor(model: Model<IArticle>) {
    this.repository = new ArticleRepository(model);
  }

  public async create(article: IArticle, userId?: string): Promise<IArticle> {
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

  public async get(id: string): Promise<IArticle | null> {
    return this.repository.findById(id);
  }

  public async getAll(): Promise<IArticle[]> {
    return this.repository.find({});
  }

  public async find(query: object): Promise<IArticle | null> {
    return this.repository.findOne(query);
  }

  public async update(id: string, update: object): Promise<IArticle | null> {
    return this.repository.update(id, update);
  }

  public async delete(id: string): Promise<IArticle | null> {
    return this.repository.delete(id);
  }
}

const articleService = new ArticleService(Article);

export default articleService;
