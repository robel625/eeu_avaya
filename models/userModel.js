const mongoose = require('mongoose');

const users1Schema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: 'male.png',
    },
    role: { type: String, default: 'users1' },
    rsg: { type: String  },
    region: { type: String  },
    district: { type: String  },
    csc:{ type: String  },
    gender: { type: String, default: 'male' },
    mobile: { type: String, default: '' },
    address: { type: String, default: '' },
    story: {
      type: String,
      default: '',
      maxlength: 200,
    },
    website: { type: String, default: '' },
    followers: [{ type: mongoose.Types.ObjectId, ref: 'users1' }],
    following: [{ type: mongoose.Types.ObjectId, ref: 'users1' }],
    saved: [{ type: mongoose.Types.ObjectId, ref: 'users1' }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('users1', users1Schema);
