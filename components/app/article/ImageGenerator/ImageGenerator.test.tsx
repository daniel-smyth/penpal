import React from 'react';
import {
  act,
  fireEvent,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { customSWRRender } from '@tests/utils';
import { fetcher, mockArticle, mockImageQueries } from '@tests/mocks';
import ImageGenerator from './ImageGenerator';

const mockQuery = mockImageQueries[0];
const mockError = { name: '', message: 'test error' };

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
  it('renders image generator input', async () => {
    customSWRRender(<ImageGenerator article={mockArticle} />);
    const input = screen.getByRole('textbox', {
      name: 'image-generator-input'
    });
    expect(input).toHaveValue('');
  });

  it('renders image generator input history list', () => {
    customSWRRender(<ImageGenerator article={mockArticle} />);
    mockArticle.image.history.forEach((query) => {
      expect(screen.getByText(query.input)).toBeInTheDocument();
    });
  });

  it('changes input and output on history item click', async () => {
    customSWRRender(<ImageGenerator article={mockArticle} />);
    const historyItem = mockArticle.image.history[0 + 1];
    const input = screen.getByRole('textbox', {
      name: 'image-generator-input'
    });

    // Mock fetch (PUT) response with history item as "current"
    fetchMock.mockOnce(
      JSON.stringify({
        ...mockArticle,
        image: { ...mockArticle.image, current: historyItem }
      })
    );
    await act(async () => clickButton(historyItem.input));

    expect(input).toHaveValue(historyItem.input);
    expect(screen.getByText(historyItem.output.data.url)).toBeInTheDocument();
  });

  it('inputs into image generator and fetches output on submit', async () => {
    customSWRRender(<ImageGenerator article={mockArticle} />);

    // Mock response from AI prompt
    fetchMock.mockOnce(JSON.stringify({ result: mockQuery }));

    await act(async () => {
      performInput('image-generator-input', mockQuery.input);
      clickButton('Generate Image');
    });

    expect(fetcher).toHaveBeenCalledWith({
      url: '/api/ai/image',
      params: { prompt: mockQuery.input, articleId: mockArticle._id }
    });
    expect(
      await screen.findByText(mockQuery.output.data.url)
    ).toBeInTheDocument();
  });

  it('adds inputs to history on submit', async () => {
    customSWRRender(<ImageGenerator article={mockArticle} />);
    for (let i = 0; i < mockImageQueries.length; i++) {
      const mockQuery = mockImageQueries[i];
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
    customSWRRender(<ImageGenerator article={mockArticle} />);

    fetchMock.mockRejectOnce({ name: '', message: 'test error' });

    await act(async () => {
      performInput('image-generator-input', mockQuery.input);
      clickButton('Generate Image');
    });

    await screen.findByText(mockError.message);
  });
});
