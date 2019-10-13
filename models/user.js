const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModel = new Schema({
    _id: String,
    name: String,
    email: String,
    role: String,
    password: String
});

module.exports = mongoose.model('users', UserModel);
