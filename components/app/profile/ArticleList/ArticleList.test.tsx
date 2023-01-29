import * as fetcher from '@lib/fetcher';
import { render, screen } from '@testing-library/react';
import ArticleList from './ArticleList';

const mockError = { name: '', message: 'test error' };

const fetch = jest.spyOn(fetcher, 'fetcher');

describe('Article List', () => {
  it('renders all articles', () => {
    render(<ArticleList />);
  });

  it('deletes an article on list item delete', async () => {
    fetch.mockImplementationOnce(() => Promise.resolve({}));

    const deleteButton = screen.getByText('Delete');

    deleteButton.click();
  });

  it('opens an article on list item click', async () => {
    const openButton = screen.getByText('Open');

    openButton.click();
  });
});
