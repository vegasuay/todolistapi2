const passport = require('passport');
const bearerStrategy = require('passport-http-bearer').Strategy;
const Token = require('../models/accessToken');
const Client  = require('../models/client');

passport.use('bearer', new bearerStrategy(
    (accessToken, callback) => {
        Token.findOne({
            value: accessToken
        },
        (err, token) => {
            if (err) { return callback(err); }

            // No token found
            if (!token) { return callback(null, false); }

            Client.findOne({
                _id: token.userId
            },
            (err, client) => {
                if (err) { return callback(err); }

                // No user found
                if (!client) { return callback(null, false); }

                // Simple example with no scope
                callback(null, client, { scope: '*' });
            });

        });
    }
));

exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });