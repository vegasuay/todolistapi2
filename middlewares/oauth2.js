const oauth2orize = require('oauth2orize');
const identifiers = require('./../helpers/identifiers');

const Client       = require('../models/client');
const AccessToken  = require('../models/accessToken');
const RefreshToken = require('../models/refreshToken');

// Create OAuth 2.0 server
const server = oauth2orize.createServer();

// Register serialialization function
server.serializeClient(
    (client, callback) => {
        return callback(null, client._id);
});

// Register deserialization function
server.deserializeClient(
    (id, callback) => {
        Client.findOne({
            _id: id
        },
        (err, client) => {
            if (err) { return callback(err); }

            return callback(null, client);
        });
});

// Register authorization RefreshToken grant type
server.grant(oauth2orize.grant.code(
    (client, redirectUri, user, scope, callback) => {
    // Create a new authorization code
    let code = new RefreshToken({
      value: identifiers.uid (16),
      clientId: client._id,
      redirectUri: redirectUri,
      userId: user._id
    });
  
    // Save the auth code and check for errors
    code.save(function(err) {
        if (err) { return callback(err); }
  
        callback(null, code.value);
    });
  }));

// Exchange authorization codes for access tokens
server.exchange(oauth2orize.exchange.code(
    (client, refreshToken, redirectUri, callback) => {
        RefreshToken.findOne({
            value: refreshToken
        },
        (err, authRefreshToken) => {
            if (err) { return callback(err); }
            if (authRefreshToken === undefined) { return callback(null, false); }
            if (client._id.toString() !== authRefreshToken.clientId) { return callback(null, false); }
            if (redirectUri !== authRefreshToken.redirectUri) { return callback(null, false); }

            // Delete auth code now that it has been used
            authRefreshToken.remove(
                (err) => {
                    if(err) { return callback(err); }

                    // Create a new access token
                    let accessToken = new AccessToken({
                        value: identifiers.uid(256),
                        clientId: authRefreshToken.clientId,
                        userId: authRefreshToken.userId
                    });

                    // Save the access token and check for errors
                    accessToken.save(
                        (err) => {
                            if (err) { return callback(err); }

                            callback(null, accessToken);
                });
            });
        });
    }
));

/**
 * User authorization endpoint
 * his endpoint, initializes a new authorization transaction. It finds the 
 * client requesting access to the user’s account and then renders the dialog 
 * ejs view we created eariler.
 */
exports.authorization = [
    server.authorization(
        (clientId, redirectUri, callback) => {
            Client.findOne({
                id: clientId
            },
            (err, client) => {
                if (err) { return callback(err); }

                return callback(null, client, redirectUri);
            });
        }
    ),
    (req, res) => {
        res.status(200).json({
            transactionID: req.oauth2.transactionID, 
            user: req.user, 
            client: req.oauth2.client
        });
    }
];

/** 
 * User decision endpoint
 * This endpoint is setup to handle when the user either grants or denies access 
 * to their account to the requesting application client. 
 * The server.decision() function handles the data submitted by the post and 
 * will call the server.grant() function if the user granted access.
*/
exports.decision = [
    server.decision()
];

/** 
 * Application client token exchange endpoint
 * This endpoint is setup to handle the request made by the application client 
 * after they have been granted an authorization code by the user. 
 * The server.token() function will initiate a call to the server.exchange() 
*/
exports.token = [
    server.token(),
    server.errorHandler()
];