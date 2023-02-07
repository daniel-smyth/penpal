import { Model } from "mongoose";
import { IArticle } from "@lib/database/models";

export default class ArticleRepository {
  private article: Model<IArticle>;

  constructor(articleModel: Model<IArticle>) {
    this.article = articleModel;
  }

  public async create(article: IArticle) {
    const newArticle = new this.article(article);
    return newArticle.save();
  }

  public async findById(id: string) {
    return this.article.findById(id);
  }

  public async findOne(query: object) {
    return this.article.findOne(query);
  }

  public async find(query: object) {
    return this.article.find(query);
  }

  public async update(id: string, update: object) {
    return this.article.findByIdAndUpdate(id, update, { new: true });
  }

  public async delete(id: string) {
    return this.article.findByIdAndDelete(id);
  }
}
