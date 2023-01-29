import { IArticle } from '@lib/database/models';

const makeArticle = (_id: string, title: string) => ({
  _id,
  title,
  text: {
    current: {
      input: '',
      output: {
        choices: [{ text: '' }]
      }
    },
    history: [
      {
        input: 'Test Text Input 1',
        output: {
          choices: [
            { text: 'Test Text Output 1' },
            { text: 'Test Text Output 2' }
          ]
        }
      },
      {
        input: 'Test Text Input 2',
        output: {
          choices: [
            { text: 'Test Text Output 3' },
            { text: 'Test Text Output 4' }
          ]
        }
      }
    ]
  },
  image: {
    current: {
      input: '',
      output: {
        data: { url: '' }
      }
    },
    history: [
      {
        input: 'Test Image Input 1',
        output: { data: { url: 'Test Image Output 1' } }
      },
      {
        input: 'Test Image Input 2',
        output: { data: { url: 'Test Image Output 2' } }
      }
    ]
  }
});

const mockArticleList: IArticle[] = [
  makeArticle('1', 'Test Article 1'),
  makeArticle('2', 'Test Article 2'),
  makeArticle('3', 'Test Article 3'),
  makeArticle('4', 'Test Article 4')
];

export default mockArticleList;
