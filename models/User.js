const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    givenName: {
        type: String,
        required: true
    },
    familyName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    postcode: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);
