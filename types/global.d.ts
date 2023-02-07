declare var mongodb: {
  promise: null | Promise<MongoClient>;
};

declare var mongoose: {
  conn: null | typeof import("mongoose");
  promise: null | Promise<typeof import("mongoose")>;
};
