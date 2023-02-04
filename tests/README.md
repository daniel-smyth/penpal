## Tests

This folder contains all the test files. Tests are run using the Jest testing framework.

### Directories

- `helpers`: Contains mock creator function.
- `mocks`: Contains mock implementations for modules used in the tests.

### Examples of Usage

Creating a test file:

```typescript
// example.test.tsx
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Example from '../components/Example';

afterEach(cleanup);

describe('Example', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<Example />);
    expect(asFragment()).toMatchSnapshot();
  });
});
```

Using a mock in Jest:

```typescript
// example.test.tsx
import { mockNextRouter } from '@tests/mocks';

beforeEach(() => {
  // Mock Next.js router
  mockNextRouter({ pathname: '/profile', asPath: '/profile' });
});

describe('Example', () => {
  it('tests router navigation', async () => {
    const { getByText } = render(<Example />);

    const button = screen.getByText(mockArticle.title);
    button.click();

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenLastCalledWith(
        `/example`
      );
    });
  });
```
