var mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

// Define our client schema for oauth2
var ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    secret: {
        type: String,
        required: false
    },
    userId: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

ClientSchema.pre('save', function(callback){
    let client = this;

    // Break out if the secret hasn't changed
    if (!client.isModified('secret')) return callback();

    // Password changed so we need to hash it
    bcrypt.genSalt(5, function (err, salt) {
        if (err) return callback(err);

        bcrypt.hash(client.secret, salt, null, function (err, hash) {
            if (err) return callback(err);
            client.secret = hash;
            callback();
        });
    });

});

// Verify password
ClientSchema.methods.verifyPassword = function(password, cb){
    bcrypt.compare(password, this.secret,
        (err, isMatch) => {
            if (err) return cb(err);
            cb(null, isMatch);
        }
    );
};

module.exports = mongoose.model('Client', ClientSchema);