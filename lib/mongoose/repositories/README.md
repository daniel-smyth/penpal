# Repositories

This directory contains all the Repository classes for Mongoose models in the project. These classes handle all the database operations for the corresponding model, providing a simple and consistent interface for interacting with the database.

## Usage

```typescript
import UserRepository from './repositories/UserRepository';

const article = await UserRepository.findUserArticleByTitle('userId', 'title');
```

Each class has methods that correspond to the CRUD operations. Ex: find, findById, findOne, create, update, delete, etc.

## Note

- Use the appropriate method for the operation, ex: `find()`, `findById()`, `findOne()`, `create()`, `update()`, `delete()`.

- Keep functions small and focused on a single responsibility.

- Use async/await for all database operations.

- Handle errors properly and provide clear error messages.

- Use a consistent naming convention for functions.

- Use TypeScript interfaces to define the shape of the data.

- Use the appropriate data types for function arguments.

- Validate input data before performing operations.

- Use the appropriate query options to retrieve the necessary data.

- Keep the repository decoupled from other parts of the application.

This folder structure is designed to keep the code organized and make it easy to find the right model class. With this, we can clearly separate the different concerns of the application and have a consistent structure for the data in the database.
