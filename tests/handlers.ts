import { rest } from 'msw';

const local = (path: string) => {
  return new URL(path, 'http://localhost:3000').toString();
};

export const handlers = [
  rest.get(local(`/api/article`), (req, res, ctx) => {
    const mockArticle = {
      _id: req.url.searchParams.get('id'),
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
    return res(ctx.delay(100), ctx.status(200), ctx.json(mockArticle));
  })
];
