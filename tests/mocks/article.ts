const mockArticle = {
  _id: '123',
  title: 'Test Title',
  text: {
    current: {
      input: '',
      output: ''
    },
    history: [
      { input: 'Test Text Input 1', output: 'Test Text Output 1' },
      { input: 'Test Text Input 2', output: 'Test Text Output 2' }
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
