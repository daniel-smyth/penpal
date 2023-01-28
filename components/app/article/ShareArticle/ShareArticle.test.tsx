import { fireEvent, render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import * as fetcher from '@lib/fetcher';
import { mockArticle } from '@tests/mocks';
import ShareArticle from './ShareArticle';

const fetch = jest.spyOn(fetcher, 'fetcher');

jest.mock('next-auth/react');

beforeEach(async () => {
  jest.clearAllMocks();
});

describe('Share Article', () => {
  describe('Un-authenticated user', () => {
    it('displays option to email article', () => {
      (useSession as jest.Mock).mockImplementation(() => ({
        data: { user: null }
      }));
      render(<ShareArticle article={mockArticle} />);
      const emailBtn = screen.getByText('Email article');
      expect(emailBtn).toBeInTheDocument();
    });

    it('prompts user to create account on button click', async () => {
      (useSession as jest.Mock).mockImplementation(() => ({
        data: { user: null }
      }));
      render(<ShareArticle article={mockArticle} />);
      const emailBtn = screen.getByText('Email article');
      fireEvent.click(emailBtn);
      expect(
        screen.getByText('Create an account to email this article')
      ).toBeInTheDocument();
    });
  });

  describe('Authenticated user', () => {
    it('prompts user to enter optional email', () => {
      (useSession as jest.Mock).mockImplementation(() => ({
        data: {
          user: { email: 'testuser@test.com' }
        }
      }));
      render(<ShareArticle article={mockArticle} />);
      const emailBtn = screen.getByText('Email article');
      fireEvent.click(emailBtn);
      expect(
        screen.getByText('Enter an optional email to send to')
      ).toBeInTheDocument();
    });

    it('prompts user to send to their email if signed in', () => {
      render(<ShareArticle article={mockArticle} />);
      const emailBtn = screen.getByText('Email article');
      fireEvent.click(emailBtn);
      expect(screen.getByText('Email article to my email')).toBeInTheDocument();
    });

    //   it('sends email of article to given email address', () => {
    //     const { getByText } = render(<ShareArticle article={mockArticle} />);
    //     const emailBtn = getByText('Email article');
    //     fireEvent.click(emailBtn);
    //     const emailInput = getByText('Enter an optional email to send to');
    //     fireEvent.change(emailInput, { target: { value: 'testuser@test.com' } });
    //     fireEvent.click(getByText('Send'));
    //     expect(fetch).toHaveBeenCalledWith({
    //       url: '/api/email',
    //       method: 'POST',
    //       body: { email: 'testuser@test.com', articleId: mockArticle._id }
    //     });
    //   });
  });
});

export {};
