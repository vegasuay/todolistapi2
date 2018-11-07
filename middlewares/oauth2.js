const oauth2orize = require('oauth2orize');
const crypto = require('crypto');
const config = require('./../config');
const User = require('./../models/auth/user');
const AccessToken = require('./../models/auth/accessToken');
const RefreshToken = require('./../models/auth/refreshToken');

// create OAuth 2.0 server
const server = oauth2orize.createServer();

// Generic error handler
const errFn = function (cb, err) {
	if (err) {
		return cb(err);
	}
};

// Destroys any old tokens and generates a new access and refresh token
const generateTokens = function (data, done) {

	// curries in `done` callback so we don't need to pass it
	let errorHandler = errFn.bind(undefined, done),
		refreshToken,
		refreshTokenValue,
		token,
		tokenValue;

	RefreshToken.remove(data, errorHandler);
	AccessToken.remove(data, errorHandler);

	tokenValue = crypto.randomBytes(32).toString('hex');
	refreshTokenValue = crypto.randomBytes(32).toString('hex');

	data.token = tokenValue;
	token = new AccessToken(data);

	data.token = refreshTokenValue;
	refreshToken = new RefreshToken(data);

	refreshToken.save(errorHandler);

	token.save(
		(err) => {
			if (err) {
				console.log(err);
				return done(err);
			}
			done(null, tokenValue, refreshTokenValue, {
				'expires_in': config.get('security:tokenLife')
			});
		});
};

// Exchange username & password for access token.
server.exchange(oauth2orize.exchange.password(
	(client, username, password, scope, done) => {

		User.findOne({
				username: username
			},
			(err, user) => {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false);
				}

				//check password
				user.verifyPassword(password,
					(err, isMatch) => {
						if (err) {
							return done(err);
						}

						//password did not match
						if (!isMatch) {
							return done(null, false);
						}

						//success
						let model = {
							userId: user.id,
							clientId: client.id
						};

						generateTokens(model, done);
					});
			});

	}));

// Exchange refreshToken for access token.
server.exchange(oauth2orize.exchange.refreshToken(
	(client, refreshToken, scope, done) => {

		RefreshToken.findOne({
			token: refreshToken,
			clientId: client.clientId
		}, function (err, token) {
			if (err) {
				return done(err);
			}

			if (!token) {
				return done(null, false);
			}

			User.findById(token.userId, function (err, user) {
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false);
				}

				var model = {
					userId: user.id,
					clientId: client.id
				};

				generateTokens(model, done);
			});
		});
	}));

// token endpoint
//
// `token` middleware handles client requests to exchange authorization grants
// for access tokens.  Based on the grant type being exchanged, the above
// exchange middleware will be invoked to handle the request.  Clients must
// authenticate when making requests to this endpoint.
exports.token = [
	server.token(),
	server.errorHandler()
];