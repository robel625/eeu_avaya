const mongoose = require('mongoose');

const eeuComplainsSchema = new mongoose.Schema(
  {
    id:{type:String, 
      // required: true, unique: true
    },
    description: { type: String, default: '' },
    created_by: { type: String, default: '' },
    rsg: { type: String, default: '' },
    catagory1: { type: String, default: '' },
    catagory2: { type: String, default: '' },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    status:{ type: String, default: '' },
    customer_id:{type: mongoose.Types.ObjectId, ref: 'keycustomers'},
    bp:{type: String, default: ''},


  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('eeuComplains', eeuComplainsSchema);
