// load packages
const passport = require('passport');
const basicStrategy = require('passport-http').BasicStrategy;
const Client = require('../models/client');

/**
 * Ejemplo de uso para BasicStrategy
 * con autenticacion por cliente
 * clientid y password
 */
passport.use('client-basic', new basicStrategy(
    (username, password, callback) => {
        Client.findOne({
            id: username
        },
        (err, client) => {
            if (err) { return callback(err); }

            // no client found
            if (!client || client.secret !== password) { return callback(null, false); }

            // success
            return callback(null, client);
        });
    }
));


exports.isClientAuthenticated = passport.authenticate('client-basic', {session: false});