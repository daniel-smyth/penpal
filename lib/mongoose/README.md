## Mongoose

MongoDB is a NoSQL database that uses a document-oriented data model. It stores data in a flexible, JSON-like format called BSON (binary JSON) and allows for high scalability and performance. Mongoose is an Object Document Mapper (ODM) library for MongoDB that provides a more elegant way to interact with the database and to perform validation, casting, and business logic on the data.

- `models`: This folder contains the Mongoose schemas and models for the application's data.
- `repositories`: This folder contains the logic for interacting with the database, using the Mongoose models.
- `services`: This folder contains the business logic of the application, using the repositories to interact with the database.

### Example of usage

```typescript
// models/user.ts
import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});
export default mongoose.model('User', userSchema);

// repositories/userRepository.ts
import User from '../models/user';
export default {
  async findOne(email: string) {
    return User.findOne({ email });
  },
  async create(user: any) {
    return new User(user).save();
  }
};

// services/userService.ts
import userRepository from '../repositories/userRepository';
export default {
  async findOne(email: string) {
    return userRepository.findOne(email);
  },
  async create(user: any) {
    return userRepository.create(user);
  }
};
```

This folder structure separates the concerns of the application, keeping the models focused on the data structure, the repositories focused on the database interactions, and the services focused on the business logic. This makes it easier to reason about the code, test it, and make changes.
