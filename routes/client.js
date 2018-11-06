const express        = require('express');
const router         = express.Router();
const clientController = require('./../controllers/clientController');
const auth = require('../middlewares/authBasic');

// Endpoint api
//=============================================================================

// Get todos los clients
// Post crear un client
router.route('/')
    .get(auth.isAuthenticated,
        (req, res) =>  {clientController.allClient(req, res);})
    .post(auth.isAuthenticated,
        (req, res) => {clientController.newClient(req, res);});

module.exports = router;