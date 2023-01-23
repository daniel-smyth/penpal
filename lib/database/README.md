## Database

This folder houses all the code related to the MongoDB database for the project, with Mongoose serving as the ODM (Object Document Mapping) library for MongoDB.

### Directories

- `models`: This folder contains the Mongoose schemas and models for the application's data.
- `repositories`: This folder contains the logic for interacting with the database, using the Mongoose models.
- `services`: This folder contains the business logic of the application, using the repositories to interact with the database.

### Examples of usage

Using a model.

```typescript
// models/user.ts
import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

export default mongoose.model('User', userSchema);
```

Using a repository.

```typescript
// repositories/userRepository.ts
import User from '../models/user';

export default class UserRepository {
  async findOne(email: string) {
    return User.findOne({ email });
  },

  async create(user: any) {
    return new User(user).save();
  }
};
```

Using a service.

```typescript
// services/userService.ts
import userRepository from '../repositories/userRepository';

export default class UserService {
  async findOne(email: string) {
    return userRepository.findOne(email);
  },

  async create(user: any) {
    return userRepository.create(user);
  }
};
```
