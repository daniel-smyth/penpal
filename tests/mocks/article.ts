const mockArticle = {
  _id: '123',
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

export default mockArticle;
