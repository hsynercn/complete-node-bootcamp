const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    unique: true,
    trim: true,
    maxlength: [40, 'A user name must have less or equal then 40 characters'],
    minlength: [10, 'A user name must have more or equal then 10 characters'],
    validator: [validator.isAlpha, 'User name must only contain characters'],
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'],
    unique: true,
    lowercase: true,
    validator: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    maxlength: [
      40,
      'A user password confirmation must have less or equal then 40 characters',
    ],
    minlength: [
      10,
      'A user password must have more or equal then 10 characters',
    ],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'A user must have a password confirmation'],
    trim: true,
    maxlength: [
      40,
      'A user password confirmation must have less or equal then 40 characters',
    ],
    minlength: [
      10,
      'A user password confirmation must have more or equal then 10 characters',
    ],
    validate: {
      // this only works with SAVE, when we create a new object
      validator: function (element) {
        return element === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
