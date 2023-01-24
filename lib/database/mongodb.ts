import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let client;
let clientPromise: Promise<MongoClient>;

let cached = global.mongodb;

if (!cached) {
  cached = global.mongodb = { promise: null };
}

if (process.env.NODE_ENV === 'development') {
  if (!global.mongodb.promise) {
    client = new MongoClient(MONGODB_URI);
    global.mongodb.promise = client.connect();
  }
  clientPromise = global.mongodb.promise;
} else {
  client = new MongoClient(MONGODB_URI);
  clientPromise = client.connect();
}

export default clientPromise;
