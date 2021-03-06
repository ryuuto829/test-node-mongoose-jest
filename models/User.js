const { Schema, model } = require('mongoose');

// Create simple user model.
// NOTE: In this example we'll use simplified approach for user authentication,
// so you should definitely add some validation, error handling
// and password hashing later on!
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model('user', userSchema);

module.exports = User;
