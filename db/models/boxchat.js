const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const BoxChatSchemas = new Schema({
    _id: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    userid: {
        type: Array,
        required: true
    },
    index: {
        type: Array
    }
}, { collection: 'boxchat' }
);

const BoxChatModel = mongoose.model('boxchat', BoxChatSchemas);

module.exports = BoxChatModel;