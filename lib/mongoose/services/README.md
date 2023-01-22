# Services

This directory contains all the Service classes for the project. These classes handle the business logic and interact with the Repository classes to perform the necessary database operations.

## Usage

```typescript
import {
  createUser,
  getUser,
  updateUser,
  deleteUser
} from './services/user.service';

const newUser = await createUser({
  email: 'user@example.com',
  password: 'password'
});
const user = await getUser('userId');
await updateUser('userId', { email: 'newEmail@example.com' });
await deleteUser('userId');
```

Each class has methods that correspond to the CRUD operations. Ex: create, get, update, delete, etc.

## Note

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

This file provides a clear explanation of the purpose and usage of the service classes in your project, and also provides guidelines on how to use them correctly and effectively.
