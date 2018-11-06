// Load required packages
const mongoose = require('mongoose');
const type_email = require('mongoose-type-email');
const bcrypt = require('bcrypt-nodejs');

// Define our user schema
const UserSchema = new mongoose.Schema({
    email: {
        type: type_email,
        require: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// Execute before each user.save() call
UserSchema.pre('save', function (callback) {
    let user = this;

    // Break out if the password hasn't changed
    if (!user.isModified('password')) return callback();

    // Password changed so we need to hash it
    bcrypt.genSalt(5, function (err, salt) {
        if (err) return callback(err);

        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) return callback(err);
            user.password = hash;
            callback();
        });
    });
});

// Verify password
UserSchema.methods.verifyPassword = function(password, cb){
    bcrypt.compare(password, this.password,
        (err, isMatch) => {
            if (err) return cb(err);
            cb(null, isMatch);
        }
    );
};

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);