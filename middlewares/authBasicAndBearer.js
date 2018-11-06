// load packages
const passport = require('passport');

// basic
const basicStrategy = require('passport-http').BasicStrategy;
const User = require('../models/user');

//bearer
const bearerStrategy = require('passport-http-bearer').Strategy;
const Token = require('../models/accessToken');
const Client  = require('../models/client');

/**
 * Ejemplo de uso para BasicStrategy
 * con autenticacion basica de usuario
 * y password
 */
passport.use('basic', new basicStrategy(
    (username, password, callback) => {
        User.findOne({
            username: username
        },
        (err, user) => {
            if (err) { return callback(err); }

            //no user found
            if (!user) { return callback(null, false); }

            //check password
            user.verifyPassword(password,
                (err, isMatch) => {
                    if (err) { return callback(err); }

                    //password did not match
                    if (!isMatch) { return callback(null, false); }

                    //success
                    return callback(null, user);
            });
        });
    }
));

/**
 * Ejemplo de uso para BearerStrategy
 * con autenticacion por token
 */
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
                _id: token.clientId
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

exports.isAuthenticated = passport.authenticate(['basic', 'bearer'], {session: false});