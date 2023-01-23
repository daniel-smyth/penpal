declare var mongoose: {
  conn: null | typeof import('mongoose');
  promise: null | Promise<typeof import('mongoose')>;
};

declare var mongo: {
  promise: null | Promise<MongoClient>;
};
