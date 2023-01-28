import React from 'react';
import { act, fireEvent, screen } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import * as fetcher from '@lib/fetcher';
import { customSwrRender } from '@tests/utils';
import { mockArticle } from '@tests/mocks';
import { ITextQuery } from '@lib/database/models';
import TextGenerator from './TextGenerator';

const mockQuery: ITextQuery = {
  input: 'test text input',
  output: {
    choices: [{ text: 'test text output 1' }, { text: 'test text output 2' }]
  }
};

const mockError = {
  name: '',
  message: 'test error'
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
});

describe('Text Generator', () => {
  it('renders text generator input', () => {
    customSwrRender(<TextGenerator article={mockArticle} />);
    expect(
      screen.getByRole('textbox', { name: 'text-generator-input' })
    ).toHaveValue('');
  });

  it('renders text generator input history list', () => {
    customSwrRender(<TextGenerator article={mockArticle} />);
    mockArticle.text.history.forEach((query) => {
      expect(screen.getByText(query.input)).toBeInTheDocument();
    });
  });

  it('changes input and output on history list item click', async () => {
    customSwrRender(<TextGenerator article={mockArticle} />);

    const historyItem = mockArticle.text.history[0 + 1];

    const newArticle = {
      ...mockArticle,
      text: { ...mockArticle.text, current: historyItem }
    };
    fetchMock.mockOnce(JSON.stringify({ result: newArticle }));

    await act(async () => clickButton(historyItem.input));

    expect(
      screen.getByRole('textbox', { name: 'text-generator-input' })
    ).toHaveValue(historyItem.input);
    expect(
      screen.getByText(historyItem.output.choices[0].text)
    ).toBeInTheDocument();
  });

  it('inputs into text generator and fetches output on submit', async () => {
    customSwrRender(<TextGenerator article={mockArticle} />);
    fetchMock.mockOnce(JSON.stringify({ result: mockQuery }));

    await act(async () => {
      performInputChange('text-generator-input', mockQuery.input);
      clickButton('Generate Text');
    });

    expect(fetch).toHaveBeenCalledWith({
      url: '/api/ai/text',
      params: { prompt: mockQuery.input, articleId: mockArticle._id }
    });

    expect(
      await screen.findByText(mockQuery.output.choices[0].text)
    ).toBeInTheDocument();
  });

  it('adds input to history on submit', async () => {
    customSwrRender(<TextGenerator article={mockArticle} />);
    fetchMock.mockOnce(JSON.stringify({ result: mockQuery }));

    await act(async () => {
      performInputChange('text-generator-input', mockQuery.input);
      clickButton('Generate Text');
    });
    expect(
      await screen.findByText(mockQuery.output.choices[0].text)
    ).toBeInTheDocument();

    fetchMock.mockOnce(
      JSON.stringify({ result: { ...mockQuery, input: 'test input 2' } })
    );
    await act(async () => {
      performInputChange('text-generator-input', 'test input 2');
      clickButton('Generate Text');
    });

    expect(screen.getByText(mockQuery.input)).toBeInTheDocument();
  });

  it('renders error on submit if fetch fails', async () => {
    customSwrRender(<TextGenerator article={mockArticle} />);
    fetchMock.mockRejectOnce({ name: '', message: 'test error' });

    await act(async () => {
      performInputChange('text-generator-input', mockQuery.input);
      clickButton('Generate Text');
    });

    await screen.findByText(mockError.message);
  });
});
