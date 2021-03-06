const Post = require('../models/Post');

// Store a new post to the database
const create = async payload => {
  if (!payload) {
    throw new Error('Post data is missing');
  }

  try {
    // Create a new post
    return await Post.create(payload);

  } catch (err) {
    throw new Error(`Can't store data to db`);
  }
};

// Retrieves post from database by id
const getById = async id => {

  if (!id) {
    throw new Error('Id is missing');
  }

  try {
    // Find post by id
    return await Post.findById(id);

  } catch (err) {
    throw new Error('No post found');
  }
};

module.exports = {
  create,
  getById,
};
