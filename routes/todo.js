const express = require('express');
const router = express.Router();
const todoController = require('./../controllers/todoController');
//const auth = require('../middlewares/authBasic'); solo para auth basica
const auth = require('../middlewares/authBasicAndBearer');

// Endpoint api
//=============================================================================

// Get todos los TODOs
router.get('/', auth.isAuthenticated,
    (req, res) => {
        todoController.listAllTodos(req, res);
    }
);

// Post crea un TODO
router.post('/', auth.isAuthenticated,
    (req, res) => {
        todoController.createNewTodo(req, res);
});

// Get unique Todo
router.get('/:taskid', auth.isAuthenticated,
    (req, res) => {
        todoController.readTodo(req, res);
    }
);

// Delete un TODO 
router.delete('/:taskid', auth.isAuthenticated,
    (req, res) => {
        todoController.deleteTodo(req, res);
});

// Update un Todo
router.put('/:taskid', auth.isAuthenticated,
    (req, res) => {
        todoController.updateTodo(req, res);
});

module.exports = router;