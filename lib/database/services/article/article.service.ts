import { Model } from "mongoose";
import { IArticle, Article } from "@lib/database/models";
import { ArticleRepository } from "@lib/database/repositories";
import { userService } from "@lib/database/services";
import { openAiClient } from "@lib/openai";

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
      throw new Error("invalid user id");
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

  public async generateAIText(input: string, id: string, choiceCount = 1) {
    const article = await this.get(id);
    if (!article) {
      throw new Error("invalid article id");
    }

    // Add new input/output to article input history
    const output = await openAiClient.generateText(input, choiceCount);
    const record = { input, output };

    article.text.current = record;
    article.text.history.unshift(record);
    await article.save();

    return record;
  }

  public async generateAIImage(input: string, id: string) {
    const article = await this.get(id);
    if (!article) {
      throw new Error("invalid article id");
    }

    // Add new input/output to article input history
    const output = await openAiClient.generateImage(input);
    const record = { input, output };

    article.image.current = record;
    article.image.history.push(record);
    await article.save();

    return record;
  }
}

const articleService = new ArticleService(Article);

export default articleService;
