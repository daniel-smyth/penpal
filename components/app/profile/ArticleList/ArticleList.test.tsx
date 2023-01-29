import fetchMock from 'jest-fetch-mock';
import { screen } from '@testing-library/react';
import * as fetcher from '@lib/fetcher';
import { mockArticleList, mockNextRouter } from '@tests/mocks';
import ArticleList from './ArticleList';
import { customSwrRender } from '@tests/utils';

beforeEach(async () => {
  fetchMock.resetMocks();
});

const fetcherSpy = jest.spyOn(fetcher, 'fetcher');

beforeEach(() => {
  fetchMock.once(JSON.stringify(mockArticleList));
  mockNextRouter({ pathname: '/profile', asPath: '/profile' });
});

describe('Article List', () => {
  it('renders all articles', async () => {
    customSwrRender(<ArticleList />);
    for (let i = 0; i < mockArticleList.length; i++) {
      const article = mockArticleList[i];
      expect(await screen.findByText(article.title)).toBeInTheDocument();
    }
  });

  it('deletes article', async () => {
    fetchMock.once(JSON.stringify(mockArticleList));
    customSwrRender(<ArticleList />);
    const deleteButton = (await screen.findAllByText('Delete'))[0];
    deleteButton.click();

    expect(fetcherSpy).toHaveBeenCalledWith({
      url: `/api/article?id=${mockArticleList[0]._id}`,
      method: 'DELETE'
    });

    const articles = await screen.findAllByText('Delete');
    expect(articles.length).toEqual(mockArticleList.length - 1);
  });
});
