const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Define a new instance of "MongoMemoryServer" to automatically start server
let mongoServer;

// For mongodb-memory-server's old version (< 7) use this instead:
// const mongoServer = new MongoMemoryServer();

const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Provide connection to a new in-memory database server.
const connect = async () => {
  // Prevent MongooseError: Can't call `openUri()` on
  // an active connection with different connection strings
  await mongoose.disconnect();

  // Spin up an actual/real MongoDB server programmatically from node, for testing
  mongoServer = await MongoMemoryServer.create();

  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, opts, err => {
    if (err) {
      console.error(err);
    }
  });
};

// Remove and close the database and server.
const close = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};

// Remove all data from collections.
const clear = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};

module.exports = {
  connect,
  close,
  clear,
};
