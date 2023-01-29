## Mocks

This folder contains all the code related to mocking data and API calls for testing purposes in Jest.

### Examples of Usage

Defining a mock for an API call:

```typescript
// mockTextQuery.ts
import { ITextQuery } from '@lib/database/models';

export const mockTextQuery: ITextQuery = {
  input: 'test text input 1',
  output: {
    choices: [{ text: 'test text output 1' }, { text: 'test text output 2' }]
  }
};
```

```typescript
// Component.test.tsx
import fetchMock from 'jest-fetch-mock';
import { mockTextQuery } from '@tests/mocks';

describe('Fetches data', () => {
  it('returns sample data', () => {
    fetchMock.mockOnce(JSON.stringify({ result: mockTextQuery }));
    const data = await fetchData();
    expect(data).toEqual(sampleData);
  });
```
