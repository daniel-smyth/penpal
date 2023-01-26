import React from 'react';
import { render, screen } from '@testing-library/react';
import EditArticleInputs from './TextGenerator';
import * as ArticleHook from '@lib/hooks/useArticle';

const mockArticle = {
  _id: '123',
  title: 'Test Title',
  text: {
    current: 'Test Current Text',
    history: [
      { input: 'Test Text Input 1', output: 'Test Text Output 1' },
      { input: 'Test Text Input 2', output: 'Test Text Output 2' }
    ]
  },
  image: {
    current: 'Test Current Image',
    history: [
      { input: 'Test Image Input 1', output: 'Test Image Output 1' },
      { input: 'Test Image Input 2', output: 'Test Image Output 2' }
    ]
  }
};

jest.mock('@lib/hooks/useArticle', () => ({
  useArticle: jest.fn()
}));

const useArticle = jest.spyOn(ArticleHook, 'useArticle');

describe('EditArticleInputs', () => {
  it('should render loading first', () => {
    useArticle.mockImplementation(() => ({ article: undefined } as any));
    render(<EditArticleInputs articleId={mockArticle._id} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

export {};
