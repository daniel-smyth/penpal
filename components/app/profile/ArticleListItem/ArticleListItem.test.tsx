import * as fetcher from '@lib/fetcher';
import { render, screen } from '@testing-library/react';
import { mockArticle } from '@tests/mocks';
import ArticleListItem from './ArticleListItem';

const mockError = { name: '', message: 'test error' };

const fetch = jest.spyOn(fetcher, 'fetcher');

describe('Article List Item', () => {
  it('renders an article', () => {
    render(<ArticleListItem article={mockArticle} />);
  });

  it('deletes article on delete on click', async () => {
    fetch.mockImplementationOnce(() => Promise.resolve({}));

    const deleteButton = screen.getByText('Delete');

    deleteButton.click();
  });

  it('opens article on click', async () => {
    const openButton = screen.getByText('Open');

    openButton.click();
  });
});
