const mongoose = require('mongoose');

// Define our token schema
const AccessToken = new mongoose.Schema({
    //actual token value used when accessing the API on behalf of the user
    value: {
        type: String,
        required: true
    },
    //used to know what user and application client own this token
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
module.exports = mongoose.model('AccessToken', AccessToken);