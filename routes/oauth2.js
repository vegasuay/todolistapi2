const express    = require('express');
const router     = express.Router();
const clientAuth = require('../middlewares/authClientPassword');
const oauth2     = require('../middlewares/oauth2');

// Endpoint api
//=============================================================================

// Create endpoint handlers for oauth2 authorize
/*
router.route('/authorize')
    .get(auth.isAuthenticated, oauth2.authorization)
    .post(auth.isAuthenticated, oauth2.decision);
*/
router.route('/token')
    .post(clientAuth.isClientPasswordAuthenticated, oauth2.token);

module.exports = router;