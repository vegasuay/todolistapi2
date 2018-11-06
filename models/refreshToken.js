// Load required packages
const mongoose = require('mongoose');

// Define our token schema
const RefreshToken = new mongoose.Schema({
    //store our authorization code
    value: {
        type: String,
        required: true
    },
    //store the redirect uri supplied in the initial authorization process
    redirectUri: {
        type: String,
        required: true
    },
    //used to know what user and application client own this code
    userId: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// Export the Mongoose model
module.exports = mongoose.model('RefreshToken', RefreshToken);