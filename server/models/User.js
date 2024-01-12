const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
});
const UserModel = mongoose.model('users', userSchema); // users: collection name
module.exports = UserModel;