## Custom Hooks

This directory contains reusable custom hooks. These hooks should be built with best practices in mind and tested to ensure they work as expected.

### Usage

You can import any hook from this directory and use them in your components.

```javascript
import { useCounter } from '@lib/hooks';

const MyComponent = () => {
  const { count, setCount } = useCounter(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```
