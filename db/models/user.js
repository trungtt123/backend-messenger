const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const UserSchema = new Schema({
    _id: {
        type: String,
    },
    username: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    fullname: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    friendid: {
        type: Array,
        trim: true
    }
}, {collection: 'user'}
);

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;