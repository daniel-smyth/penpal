## Services

This directory contains all the Service classes for Paypal. They contain the business logic of the application, using the repositories to interact with the database.

### Usage

```typescript
import { userService } from '@lib/mongoose/services';

const user = await userService.getUser('userId');

await userService.updateUser('userId', { email: 'newEmail@example.com' });

await userService.deleteUser('userId');
```

Each class has methods that correspond to the CRUD operations. Ex: create, get, update, delete, etc.

### Note

- Use the appropriate method for the operation, ex: create(), get(), update(), delete().

- Keep functions small and focused on a single responsibility.

- Use async/await for all database operations.

- Handle errors properly and provide clear error messages.

- Use a consistent naming convention for functions.

- Use TypeScript interfaces to define the shape of the data.

- Use the appropriate data types for function arguments.

- Validate input data before performing operations.

- Connect to the database before performing any database operations, and disconnect after you are done.

- Keep the services decoupled from other parts of the application.
