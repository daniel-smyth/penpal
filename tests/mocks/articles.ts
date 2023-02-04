import { IArticle } from '@lib/database/models';
import { makeArticle } from '@tests/helpers';

const mockArticleList: IArticle[] = [
  makeArticle(),
  makeArticle(),
  makeArticle(),
  makeArticle()
];

export default mockArticleList;
