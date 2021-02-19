const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { create, getById } = require('./services/post');
const { createUser, generateAccessToken, login } = require('./services/user');
const { verifyUserAuth } = require('./middlewares/auth');

// Require variables from .env file
require('dotenv').config();
// Add your connection string into .env file
const { MONGO_DB_CONNECT, JWT_TOKEN_EXPIRES_IN } = process.env;
// For cookies convert minutes to milliseconds
const JWT_TOKEN_EXPIRES_IN_MS = JWT_TOKEN_EXPIRES_IN * 60 * 1000;

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
app.use(cookieParser());

// Routes

// Protected route
app.get('/', verifyUserAuth, (req, res) => {
  res.send('Protected page');
});

// Create a new user
app.post('/api/user/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Create a new user in database
    const user = await createUser(email, password);

    // Generate a token
    const token = generateAccessToken(user._id);

    // Store jwt token in cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: JWT_TOKEN_EXPIRES_IN_MS,
    });

    res.status(201).send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

// User login
app.post('/api/user/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await login(email, password);

    // Generate a token
    const token = generateAccessToken(user._id);

    // Store jwt token in cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: JWT_TOKEN_EXPIRES_IN_MS,
    });

    res.status(200).send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Add a new post
app.post('/api/posts/create', async (req, res) => {
  try {
    // Create a new post
    const post = await create(req.body);

    res.status(201).json(post);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// Get post by id
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
