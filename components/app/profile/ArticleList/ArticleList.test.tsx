import * as fetcher from '@lib/fetcher';
import { render, screen } from '@testing-library/react';
import ArticleList from './ArticleList';

const mockError = { name: '', message: 'test error' };

const fetch = jest.spyOn(fetcher, 'fetcher');

describe('Article List', () => {
  it('renders all articles', () => {
    render(<ArticleList />);
  });
});
