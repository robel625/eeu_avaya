const mongoose = require('mongoose');

const keyCustomersSchema = new mongoose.Schema(
  {
    id: Number,
    bp:   { type: String, default: '' },
    district: { type: String, default: '' },
    name: { type: String, default: '', },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    email: { type: String, default: '' },
    rsg: { type: String, default: '' },
    csc: { type: String, default: '' },
    remark: { type: String, default: '' },
    active: Boolean,
    updatedby:{type: String, default: ''}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('keycustomers', keyCustomersSchema);
