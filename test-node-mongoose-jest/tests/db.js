const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Spin up an actual/real MongoDB server programmatically from node, for testing
// Read more: https://dev.to/paulasantamaria/testing-node-js-mongoose-with-an-in-memory-database-32np
// Read more: https://github.com/nodkz/mongodb-memory-server

const mongoServer = new MongoMemoryServer();

const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Provide connection to a new in-memory database
const connect = async () => {
  // Prevent MongooseError: Can't call `openUri()` on an active connection with different connection strings
  await mongoose.disconnect();

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

// Clear all data from collections
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
