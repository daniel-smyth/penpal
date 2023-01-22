import { Model } from 'mongoose';
import { IArticle } from '@lib/db/models';

export default class ArticleRepository {
  private article: Model<IArticle>;

  constructor(articleModel: Model<IArticle>) {
    this.article = articleModel;
  }

  public async create(user: IArticle): Promise<IArticle> {
    const newUser = new this.article(user);
    return newUser.save();
  }

  public async findById(id: string): Promise<IArticle | null> {
    return this.article.findById(id);
  }

  public async findOne(query: object): Promise<IArticle | null> {
    return this.article.findOne(query);
  }

  public async find(query: object): Promise<IArticle[]> {
    return this.article.find(query);
  }

  public async update(id: string, update: object): Promise<IArticle | null> {
    return this.article.findByIdAndUpdate(id, update, { new: true });
  }

  public async delete(id: string): Promise<IArticle | null> {
    return this.article.findByIdAndDelete(id);
  }
}
