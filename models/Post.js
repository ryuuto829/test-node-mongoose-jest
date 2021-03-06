const { Schema, model } = require('mongoose');

// Create simple post model
const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Post = model('post', postSchema);

module.exports = Post;
