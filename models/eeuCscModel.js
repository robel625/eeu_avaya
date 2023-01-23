const mongoose = require('mongoose');

const eeuCscSchema = new mongoose.Schema(
  {
    region: { type: String, default: '' },
    district: { type: String, default: '' },
    csc: { type: String, default: '' },
    rsg: { type: String, default: '' },
    fullname: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
    },
    Agent_Id: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25,
      },
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    gender: { type: String, default: 'male' },
    phone: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('eeuCsc', eeuCscSchema);
