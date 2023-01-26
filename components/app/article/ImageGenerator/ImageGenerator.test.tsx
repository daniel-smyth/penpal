import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ImageGenerator from './ImageGenerator';
import * as ArticleHook from '@lib/hooks/useArticle';
import * as Fetcher from '@lib/fetcher';

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

const mockImage = {
  data: {
    url: 'https://test.com'
  }
};

jest.mock('@lib/hooks/useArticle', () => ({
  useArticle: jest.fn()
}));

jest.mock('@lib/fetcher', () => ({
  fetcher: jest.fn()
}));

const useArticle = jest.spyOn(ArticleHook, 'useArticle');
const fetcher = jest.spyOn(Fetcher, 'fetcher');

describe('Image Generator', () => {
  it('should render loading first', () => {
    useArticle.mockImplementation(() => ({ article: undefined } as any));
    render(<ImageGenerator articleId={mockArticle._id} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render image generator input', () => {
    useArticle.mockImplementation(() => ({ article: mockArticle } as any));
    render(<ImageGenerator articleId={mockArticle._id} />);
    expect(
      screen.getByRole('textbox', { name: 'image-generator-input' })
    ).toHaveValue('');
  });

  it('should render current image', () => {
    useArticle.mockImplementation(() => ({ article: mockArticle } as any));
    render(<ImageGenerator articleId={mockArticle._id} />);
    expect(screen.getByText(mockArticle.image.current)).toBeInTheDocument();
  });

  it('should render image generator input history', () => {
    useArticle.mockImplementation(() => ({ article: mockArticle } as any));
    render(<ImageGenerator articleId={mockArticle._id} />);
    mockArticle.image.history.forEach(({ input }) => {
      expect(screen.getByText(input)).toBeInTheDocument();
    });
  });

  it('should fetch image', () => {
    useArticle.mockImplementation(
      () => ({ article: mockArticle, mutate: () => ({}) } as any)
    );
    render(<ImageGenerator articleId={mockArticle._id} />);
    fetcher.mockImplementation(() =>
      Promise.resolve({ input: 'test input', output: mockImage })
    );
    const input = screen.getByRole('textbox', {
      name: 'image-generator-input'
    }) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test input' } });
    expect(fetcher).toHaveBeenCalledWith({
      url: '/api/ai/image',
      params: { prompt: 'test input', articleId: mockArticle._id }
    });
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

export {};
