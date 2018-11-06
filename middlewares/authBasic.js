// load packages
const passport = require('passport');
const basicStrategy = require('passport-http').BasicStrategy;
const User = require('../models/user');

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

exports.isAuthenticated = passport.authenticate('basic', {session: false});