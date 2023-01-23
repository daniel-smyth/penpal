import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let client: MongoClient | undefined;
let promise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (!global.mongo.promise) {
    client = new MongoClient(MONGODB_URI);

    global.mongo.promise = client.connect();
  }

  promise = global.mongo.promise;
} else {
  client = new MongoClient(MONGODB_URI);

  promise = client.connect();
}

export default promise;
