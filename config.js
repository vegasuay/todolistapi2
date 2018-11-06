var nconf = require('nconf');

nconf.argv()
	.env()
	.file({
		file: './settings.json'
	});

module.exports = nconf;

