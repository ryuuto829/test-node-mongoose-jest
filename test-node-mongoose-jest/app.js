const express = require('express');
const mongoose = require('mongoose');
const { create, getById } = require('./services/post');

// Require variables from .env file
require('dotenv').config();
// Add your connection string into .env file
const { MONGO_DB_CONNECT } = process.env;

const app = express();

// Set up mongoose connection
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(MONGO_DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

// Middlewares
app.use(express.json());

// Routes
app.post('/api/posts/create', async (req, res) => {
  try {
    // Create a new post
    const post = await create(req.body);

    res.status(201).json(post);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

app.get('/api/posts/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find post by id
    const post = await getById(id);

    res.status(200).json(post);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = app;
