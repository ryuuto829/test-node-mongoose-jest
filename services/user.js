const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Require variables from .env file
require('dotenv').config();
const { JWT_TOKEN_SECRET, JWT_TOKEN_EXPIRES_IN } = process.env;

// Create auth token using JWT
const generateAccessToken = id =>
  jwt.sign({ id }, JWT_TOKEN_SECRET, {
    expiresIn: `${JWT_TOKEN_EXPIRES_IN}m`,
  });

// Register a new user and generate JWT token
const createUser = async (email, password) => {
  try {
    return await User.create({ email, password });
  } catch (err) {
    throw new Error('Can\'t register a new user');
  }
};

// User login
const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (user) {
    const auth = password === user.password;

    if (auth) {
      return user;
    }
    throw new Error('incorrect password');
  }
  throw new Error('no email found');
};

module.exports = {
  createUser,
  generateAccessToken,
  login,
};


