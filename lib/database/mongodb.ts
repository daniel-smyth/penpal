import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI undefined. Please add to .env file");
}

let cached = global.mongodb;

if (!cached) {
  cached = global.mongodb = { promise: null };
}

/**
 * Setup database connection with MongoDB and cache it. This is used specifically
 * for next-auth API endpoint .
 */
let client;
let mongoPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement)
  if (!global.mongodb.promise) {
    client = new MongoClient(MONGODB_URI);

    global.mongodb.promise = client.connect();
  }

  mongoPromise = global.mongodb.promise;
} else {
  // In production mode, it's best to not use a global variable
  client = new MongoClient(MONGODB_URI);

  mongoPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions
export default mongoPromise;
