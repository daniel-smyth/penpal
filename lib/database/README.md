## Database

This folder houses all the code related to the MongoDB database for the project, with Mongoose serving as the ODM (Object Document Mapping) library for MongoDB.

### Directories

- `models`: This folder contains the Mongoose schemas and models for the application's data.
- `repositories`: This folder contains the logic for interacting with the database, using the Mongoose models.
- `services`: This folder contains the business logic of the application, using the repositories to interact with the database.

### Examples of usage

Defining a model.

```typescript
// models/user/user.model.ts
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model("User", userSchema);
```

Defining a repository.

```typescript
// repositories/user/user.repository.ts
import { User } from '@lib/db/models';

export default class UserRepository {
  async findOne(email: string) {
    return User.findOne({ email });
  },

  async create(user: any) {
    return new User(user).save();
  }
};
```

Defining a service.

```typescript
// services/user/user.service.ts
import { userRepository } from '@lib/db/repositories';

export default class UserService {
  async findOne(email: string) {
    return userRepository.findOne(email);
  },

  async create(user: any) {
    return userRepository.create(user);
  }
};
```
