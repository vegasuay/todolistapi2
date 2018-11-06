const express        = require('express');
const router         = express.Router();
const userController = require('./../controllers/userController');
const auth = require('../middlewares/authBasic');

// Endpoint api
//=============================================================================

// Get todos los users
// Post crear usuario
router.route('/')
    .get(auth.isAuthenticated,
        (req, res) =>  {userController.allUsers(req, res);})
    .post(auth.isAuthenticated,
        (req, res) => {userController.newUser(req, res);});

module.exports = router;