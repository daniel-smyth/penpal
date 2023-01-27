import React from 'react';
import {
  act,
  fireEvent,
  screen,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import * as fetcher from '@lib/fetcher';
import { customSwrRender } from '@tests/utils';
import { mockArticle } from '@tests/mocks';
import ImageGenerator from './ImageGenerator';

const mockQuery = {
  input: 'test input',
  output: {
    data: {
      url: 'https://test.com'
    }
  }
};

const fetch = jest.spyOn(fetcher, 'fetcher');

const performInputChange = async (name: string, value: string) => {
  const input = screen.getByRole('textbox', { name }) as HTMLInputElement;
  fireEvent.change(input, { target: { value } });
};

const clickButton = (text: string) => {
  const generateImageBtn = screen.getByText(text);
  fireEvent.click(generateImageBtn);
};

beforeEach(async () => {
  fetchMock.resetMocks();
  customSwrRender(<ImageGenerator article={mockArticle} />);
});

describe('Image Generator', () => {
  it('renders image generator input', () => {
    expect(
      screen.getByRole('textbox', { name: 'image-generator-input' })
    ).toHaveValue('');
  });

  it('renders image generator input history', () => {
    mockArticle.image.history.forEach((query) => {
      expect(screen.getByText(query.input)).toBeInTheDocument();
    });
  });

  it('inputs into image generator and fetches image on submit button click', async () => {
    fetchMock.mockOnce(JSON.stringify(mockQuery));

    await act(async () => {
      performInputChange('image-generator-input', mockQuery.input);
      clickButton('Generate Image');
    });

    expect(fetch).toHaveBeenCalledWith({
      url: '/api/ai/image',
      params: { prompt: mockQuery.input, articleId: mockArticle._id }
    });

    await waitFor(() => screen.getByText(mockQuery.output.data.url));
  });

  it('adds a new input to input history after submit button click', async () => {
    fetchMock.mockOnce(JSON.stringify(mockQuery));

    await act(async () => {
      performInputChange('image-generator-input', mockQuery.input);
      clickButton('Generate Image');
    });

    await waitFor(() => screen.getByText(mockQuery.output.data.url));

    fetchMock.mockOnce(JSON.stringify({ ...mockQuery, input: 'test input 2' }));

    await act(async () => {
      performInputChange('image-generator-input', 'test input 2');
      clickButton('Generate Image');
    });

    expect(screen.getByText(mockQuery.input)).toBeInTheDocument();
  });

  it('renders error message after submit button click if fetch fails', async () => {
    const mockError = { name: '', message: 'test error' };
    fetchMock.mockRejectOnce(mockError);

    await act(async () => {
      performInputChange('image-generator-input', mockQuery.input);
      clickButton('Generate Image');
    });

    expect(fetch).toHaveBeenCalledWith({
      url: '/api/ai/image',
      params: { prompt: mockQuery.input, articleId: mockArticle._id }
    });

    await waitFor(() => screen.getByText(mockError.message));
  });

  it('changes user input and output when input history item is clicked', async () => {
    const historyItem = mockArticle.image.history.at(-1)?.input || '';
    await act(async () => fireEvent.click(screen.getByText(historyItem)));

    const input = screen.getByRole('textbox', {
      name: 'image-generator-input'
    });

    expect(input).toHaveValue(mockArticle.image.history.at(-1)?.input);
    expect(
      screen.getByText(mockArticle.image.history.at(-1)!.output.data.url)
    ).toBeInTheDocument();
  });
});
