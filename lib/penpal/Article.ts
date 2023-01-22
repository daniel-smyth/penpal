export class Article {
  constructor(
    public title: string,
    public content?: string,
    public image?: string
  ) {}

  public addContent(content: string) {
    this.content += content;
  }

  public addImage(image: string) {
    this.image = image;
  }
}
