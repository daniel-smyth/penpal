import { IArticle, Article, User } from '@lib/mongoose/models';
import { ArticleRepository } from '@lib/mongoose/repositories';

class ArticleService {
  private repository: ArticleRepository;

  constructor() {
    this.repository = new ArticleRepository(Article);
  }

  async createArticle(data: IArticle, userId: string): Promise<IArticle> {
    const article = await this.repository.create(data);
    await User.updateOne({ _id: userId }, { $push: { articles: article._id } });
    return article;
  }

  public async getArticle(id: string): Promise<IArticle | null> {
    return this.repository.findById(id);
  }

  public async getAllArticles(): Promise<IArticle[]> {
    return this.repository.find({});
  }

  public async findArticle(query: object): Promise<IArticle | null> {
    return this.repository.findOne(query);
  }

  public async updateArticle(
    id: string,
    update: object
  ): Promise<IArticle | null> {
    return this.repository.update(id, update);
  }

  public async deleteArticle(id: string): Promise<IArticle | null> {
    return this.repository.delete(id);
  }
}

const articleService = new ArticleService();

export default articleService;
