import { rest } from 'msw';
import { mockArticle } from '@tests/mocks';

export const handlers = [
  rest.get(`/api/article`, (req, res, ctx) => {
    return res(
      ctx.delay(100),
      ctx.json({ ...mockArticle, _id: req.url.searchParams.get('id') })
    );
  }),
  rest.get('/api/ai/image', (req, res, ctx) => {
    return res(
      ctx.delay(100),
      ctx.json({
        input: req.url.searchParams.get('prompt'),
        output: { data: { url: 'https://test.com' } }
      })
    );
  })
];
