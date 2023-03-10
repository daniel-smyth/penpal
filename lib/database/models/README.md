## Models

This directory contains all the Mongoose models for the project.

### Usage

```typescript
import { IUser, User } from "@lib/db/models";

const newUser: IUser = new User({
  name: "John Doe",
  email: "johndoe@example.com",
  password: "password",
});
```

### Note

- Define the structure of the data using Mongoose Schemas.

- Use TypeScript interfaces to define the shape of the data.

- Use appropriate data types for fields.

- Validate fields before saving to the database.

- Use virtuals and methods to handle calculated fields and custom behavior.

- Use pre-save and post-save hooks to handle additional logic.

- Use appropriate options for fields like unique and index.

- Avoid using any business logic in the models.

- Keep the models decoupled from other parts of the application.

- Keep the models simple and focused on a single responsibility.
