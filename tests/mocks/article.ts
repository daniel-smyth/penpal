import { IArticle } from '@lib/database/models';

const mockArticle: IArticle = {
  _id: '123',
  title: 'Test Title',
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
};

export default mockArticle;
