import React from 'react';
import { act, fireEvent, screen } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import * as fetcher from '@lib/fetcher';
import { customSwrRender } from '@tests/utils';
import { mockArticle, mockImageQueries } from '@tests/mocks';
import ImageGenerator from './ImageGenerator';

const mockQuery = mockImageQueries[0];
const mockError = { name: '', message: 'test error' };

const fetch = jest.spyOn(fetcher, 'fetcher');

const clickButton = (text: string) => {
  fireEvent.click(screen.getByText(text));
};

const performInput = (name: string, value: string) => {
  fireEvent.change(screen.getByRole('textbox', { name }), {
    target: { value }
  });
};

beforeEach(async () => {
  fetchMock.resetMocks();
});

describe('Image Generator', () => {
  it('renders image generator input', () => {
    customSwrRender(<ImageGenerator article={mockArticle} />);
    const input = screen.getByRole('textbox', {
      name: 'image-generator-input'
    });
    expect(input).toHaveValue('');
  });

  it('renders image generator input history list', () => {
    customSwrRender(<ImageGenerator article={mockArticle} />);
    mockArticle.image.history.forEach((query) => {
      expect(screen.getByText(query.input)).toBeInTheDocument();
    });
  });

  it('changes input and output on history list item click', async () => {
    customSwrRender(<ImageGenerator article={mockArticle} />);
    const historyItem = mockArticle.image.history[0 + 1];
    const input = screen.getByRole('textbox', {
      name: 'image-generator-input'
    });

    // Mock fetch with article's "current" prop set to the history item
    fetchMock.mockOnce(
      JSON.stringify({
        result: {
          ...mockArticle,
          image: { ...mockArticle.image, current: historyItem }
        }
      })
    );
    await act(async () => clickButton(historyItem.input));

    expect(input).toHaveValue(historyItem.input);
    expect(screen.getByText(historyItem.output.data.url)).toBeInTheDocument();
  });

  it('inputs into image generator and fetches output on submit', async () => {
    customSwrRender(<ImageGenerator article={mockArticle} />);

    // Mock query includes a mocked "output" property
    fetchMock.mockOnce(JSON.stringify({ result: mockQuery }));

    await act(async () => {
      performInput('image-generator-input', mockQuery.input);
      clickButton('Generate Image');
    });

    expect(fetch).toHaveBeenCalledWith({
      url: '/api/ai/image',
      params: { prompt: mockQuery.input, articleId: mockArticle._id }
    });
    expect(
      await screen.findByText(mockQuery.output.data.url)
    ).toBeInTheDocument();
  });

  it('adds inputs to history on submit', async () => {
    customSwrRender(<ImageGenerator article={mockArticle} />);
    for (let i = 0; i < mockImageQueries.length; i++) {
      const mockQuery = mockImageQueries[i];

      // Mock query includes a mocked "output" property
      fetchMock.mockOnce(JSON.stringify({ result: mockQuery }));

      await act(async () => {
        performInput('image-generator-input', mockQuery.input);
        clickButton('Generate Image');
      });
      if (i !== 0) {
        const previousInput = screen.getByText(mockImageQueries[i - 1].input);
        expect(previousInput).toBeInTheDocument();
      }
    }
  });

  it('renders error on submit if fetch fails', async () => {
    customSwrRender(<ImageGenerator article={mockArticle} />);

    fetchMock.mockRejectOnce({ name: '', message: 'test error' });

    await act(async () => {
      performInput('image-generator-input', mockQuery.input);
      clickButton('Generate Image');
    });

    await screen.findByText(mockError.message);
  });
});
