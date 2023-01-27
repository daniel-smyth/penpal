import React from 'react';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import * as fetcher from '@lib/fetcher';
import { customSwrRender } from '@tests/utils';
import { mockArticle } from '@tests/mocks';
import TextGenerator from './TextGenerator';

const mockQuery = {
  input: 'test text input',
  output: {
    choices: [{ text: 'test text output 1' }, { text: 'test text output 2' }]
  }
};

const fetch = jest.spyOn(fetcher, 'fetcher');

const performInputChange = async (name: string, value: string) => {
  const input = screen.getByRole('textbox', { name }) as HTMLInputElement;
  fireEvent.change(input, { target: { value } });
};

const clickButton = (text: string) => {
  const generateTextBtn = screen.getByText(text);
  fireEvent.click(generateTextBtn);
};

beforeEach(async () => {
  fetchMock.resetMocks();
  customSwrRender(<TextGenerator article={mockArticle} />);
});

describe('Text Generator', () => {
  it('renders text generator input', () => {
    expect(
      screen.getByRole('textbox', { name: 'text-generator-input' })
    ).toHaveValue('');
  });

  it('renders text generator input history', () => {
    mockArticle.text.history.forEach((query) => {
      expect(screen.getByText(query.input)).toBeInTheDocument();
    });
  });

  it('inputs into text generator and fetches text on submit button click', async () => {
    fetchMock.mockOnce(JSON.stringify(mockQuery));

    await act(async () => {
      performInputChange('text-generator-input', mockQuery.input);
      clickButton('Generate Text');
    });

    expect(fetch).toHaveBeenCalledWith({
      url: '/api/ai/text',
      params: { prompt: mockQuery.input, articleId: mockArticle._id }
    });

    await waitFor(() => screen.getByText(mockQuery.output.choices[0].text));
  });

  it('adds a new input to input history after submit button click', async () => {
    fetchMock.mockOnce(JSON.stringify(mockQuery));

    await act(async () => {
      performInputChange('text-generator-input', mockQuery.input);
      clickButton('Generate Text');
    });

    await waitFor(() => screen.getByText(mockQuery.output.choices[0].text));

    fetchMock.mockOnce(JSON.stringify({ ...mockQuery, input: 'test input 2' }));

    await act(async () => {
      performInputChange('text-generator-input', 'test input 2');
      clickButton('Generate Text');
    });

    expect(screen.getByText(mockQuery.input)).toBeInTheDocument();
  });

  it('renders error message after submit button click if fetch fails', async () => {
    const mockError = { name: '', message: 'test error' };
    fetchMock.mockRejectOnce(mockError);

    await act(async () => {
      performInputChange('text-generator-input', mockQuery.input);
      clickButton('Generate Text');
    });

    await waitFor(() => screen.getByText(mockError.message));
  });

  it('changes current input and current output when input history item is clicked', async () => {
    const { input: prompt, output } = mockArticle.text.history[0 + 1];

    await act(async () => fireEvent.click(screen.getByText(prompt)));

    const input = screen.getByRole('textbox', {
      name: 'text-generator-input'
    });

    expect(input).toHaveValue(prompt);
    expect(screen.getByText(output.choices[0].text)).toBeInTheDocument();
  });
});
