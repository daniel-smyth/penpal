import fetchMock from 'jest-fetch-mock';
import { render, screen, waitFor } from '@testing-library/react';
import { fetcher, mockArticleList, mockNextRouter } from '@tests/mocks';
import ArticleListItem from './ArticleListItem';

const mockArticle = mockArticleList[0];
const mockError = { name: '', message: 'test error' };

beforeEach(() => {
  mockNextRouter({ pathname: '/profile', asPath: '/profile' });
});

describe('Article List Item', () => {
  it('renders article title', () => {
    render(<ArticleListItem article={mockArticle} />);
    expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
  });

  it('deletes article', async () => {
    fetchMock.mockOnce(JSON.stringify(mockArticle));
    render(<ArticleListItem article={mockArticle} />);

    const deleteButton = screen.getByText('Delete');
    deleteButton.click();

    expect(fetcher).toHaveBeenCalledWith({
      url: `/api/article?id=${mockArticle._id}`,
      method: 'DELETE'
    });
  });

  it('opens article', async () => {
    const mockRouter = mockNextRouter();

    render(<ArticleListItem article={mockArticle} />);

    const linkButton = screen.getByText(mockArticle.title);
    linkButton.click();

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenLastCalledWith(
        `/article/${mockArticle._id}`
      );
    });
  });
});
