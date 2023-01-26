import React from 'react';
import {
  fireEvent,
  screen,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react';
import ImageGenerator from './ImageGenerator';
import { customSwrRender } from '@tests';
import * as Fetcher from '@lib/fetcher';
import { mockArticle } from '@tests/mocks';

const fetcher = jest.spyOn(Fetcher, 'fetcher');

describe('Image Generator', () => {
  beforeEach(async () => {
    customSwrRender(<ImageGenerator articleId="123" />);
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
  });

  it('should render image generator input', () => {
    customSwrRender(<ImageGenerator articleId="123" />);
    expect(
      screen.getByRole('textbox', { name: 'image-generator-input' })
    ).toHaveValue('');
  });

  it('should render current image', () => {
    customSwrRender(<ImageGenerator articleId="123" />);
    expect(screen.getByText(mockArticle.image.current)).toBeInTheDocument();
  });

  it('should render image generator input history', () => {
    customSwrRender(<ImageGenerator articleId="123" />);
    mockArticle.image.history.forEach(({ input }) => {
      expect(screen.getByText(input)).toBeInTheDocument();
    });
  });

  it('should fetch image on text input', async () => {
    customSwrRender(<ImageGenerator articleId="123" />);
    const input = screen.getByRole('textbox', {
      name: 'image-generator-input'
    }) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test input' } });
    expect(fetcher).toHaveBeenCalledWith({
      url: '/api/ai/image',
      params: { prompt: 'test input', articleId: '123' }
    });
    await waitFor(() => screen.getByText('https://test.com'));
    expect(screen.getByText('https://test.com')).toBeInTheDocument();
  });
});
