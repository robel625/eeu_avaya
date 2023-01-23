const mongoose = require('mongoose')

const groupmesSchema = new mongoose.Schema({
    conversation: { type: mongoose.Types.ObjectId, ref: 'group' },
    sender: { type: mongoose.Types.ObjectId, ref: 'users1' },
    recipient: { type: mongoose.Types.ObjectId, ref: 'group' },
    text: String,
    media: Array
}, {
    timestamps: true
})

module.exports = mongoose.model('groupmes', groupmesSchema)