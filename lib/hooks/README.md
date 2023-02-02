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

### SWR

We also have custom SWR hooks defined for easy data management and reusability. The example below demonstrates how to use the useArticle hook in a component.

```javascript
import { useArticle } from '@lib/hooks';

function Profile() {
  const { article, isLoading, isError } = useArticle();

  if (isLoading) {
    return <div>loading...</div>;
  }
  if (isError) {
    return <div>error!</div>;
  }

  return <div>article title: {article.title}!</div>;
}
```
