import React from 'react';
import { act, fireEvent, screen } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { customSWRRender } from '@tests/utils';
import { fetcher, mockArticleList, mockTextQueries } from '@tests/mocks';
import TextGenerator from './TextGenerator';

const mockArticle = mockArticleList[0];
const mockQuery = mockTextQueries[0];
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

describe('Text Generator', () => {
  it('renders text generator input', () => {
    customSWRRender(<TextGenerator article={mockArticle} />);
    const input = screen.getByRole('textbox', { name: 'text-generator-input' });
    expect(input).toHaveValue('');
  });

  it('renders text generator input history list', () => {
    customSWRRender(<TextGenerator article={mockArticle} />);
    mockArticle.text.history.forEach((query) => {
      expect(screen.getByText(query.input)).toBeInTheDocument();
    });
  });

  it('changes input and output on history list item click', async () => {
    customSWRRender(<TextGenerator article={mockArticle} />);
    const historyItem = mockArticle.text.history[0 + 1];
    const input = screen.getByRole('textbox', { name: 'text-generator-input' });

    // Mock fetch (PUT) response with history item as "current"
    fetchMock.mockOnce(
      JSON.stringify({
        result: {
          ...mockArticle,
          text: { ...mockArticle.text, current: historyItem }
        }
      })
    );
    await act(async () => clickButton(historyItem.input));

    expect(input).toHaveValue(historyItem.input);
    expect(
      screen.getByText(historyItem.output.choices[0].text)
    ).toBeInTheDocument();
  });

  it('inputs into text generator and fetches output on submit', async () => {
    customSWRRender(<TextGenerator article={mockArticle} />);

    // Mock query includes a mocked "output" property
    fetchMock.mockOnce(JSON.stringify({ result: mockQuery }));

    await act(async () => {
      performInput('text-generator-input', mockQuery.input);
      clickButton('Generate Text');
    });

    expect(fetcher).toHaveBeenCalledWith({
      url: '/api/ai/text',
      params: { input: mockQuery.input, articleId: mockArticle._id }
    });
    expect(
      await screen.findByText(mockQuery.output.choices[0].text)
    ).toBeInTheDocument();
  });

  it('adds inputs to history on submit', async () => {
    customSWRRender(<TextGenerator article={mockArticle} />);
    for (let i = 0; i < mockTextQueries.length; i++) {
      const mockQuery = mockTextQueries[i];
      fetchMock.mockOnce(JSON.stringify({ result: mockQuery }));

      await act(async () => {
        performInput('text-generator-input', mockQuery.input);
        clickButton('Generate Text');
      });
      if (i !== 0) {
        const previousInput = screen.getByText(mockTextQueries[i - 1].input);
        expect(previousInput).toBeInTheDocument();
      }
    }
  });

  it('renders error on submit if fetch fails', async () => {
    customSWRRender(<TextGenerator article={mockArticle} />);

    fetchMock.mockRejectOnce({ name: '', message: 'test error' });

    await act(async () => {
      performInput('text-generator-input', mockQuery.input);
      clickButton('Generate Text');
    });

    await screen.findByText(mockError.message);
  });
});
