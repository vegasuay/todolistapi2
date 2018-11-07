const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
const Client = require('../models/auth/client');

/**
 * Ejemplo de uso para BasicStrategy
 * con autenticacion por cliente
 * clientid y password
 */
passport.use("clientBasic", new BasicStrategy(
    function (clientId, clientSecret, done) {
        Client.findOne({id: clientId}, function (err, client) {
            if (err) return done(err)
            if (!client) return done(null, false)


            //check password
            client.verifyPassword(clientSecret,
                (err, isMatch) => {
                    if (err) { return callback(err); }

                    //password did not match
                    if (!isMatch) { return done(null, false); }

                    //success
                    return done(null, client);
            });
        });
    }
));

passport.use("clientPassword", new ClientPasswordStrategy(
    function (clientId, clientSecret, done) {
        Client.findOne({clientId: clientId}, function (err, client) {
            if (err) return done(err);
            if (!client) return done(null, false);

            //check password
            client.verifyPassword(clientSecret,
                (err, isMatch) => {
                    if (err) { return callback(err); }

                    //password did not match
                    if (!isMatch) { return done(null, false); }

                    //success
                    return done(null, client);
            });
        });
    }
));

exports.isClientPasswordAuthenticated = passport.authenticate(['clientBasic', 'clientPassword'], { session: false });