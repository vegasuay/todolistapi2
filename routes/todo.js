const express = require('express');
const router = express.Router();
const todoController = require('./../controllers/todoController');
//const auth = require('../middlewares/authBasic'); solo para auth basica
const auth = require('../middlewares/authBearerToken');

// Endpoint api
//=============================================================================

// Get todos los TODOs
router.get('/', auth.isBearerAuthenticated,
    (req, res) => {
        todoController.listAllTodos(req, res);
    }
);

// Post crea un TODO
router.post('/', auth.isBearerAuthenticated,
    (req, res) => {
        todoController.createNewTodo(req, res);
});

// Get unique Todo
router.get('/:taskid', auth.isBearerAuthenticated,
    (req, res) => {
        todoController.readTodo(req, res);
    }
);

// Delete un TODO 
router.delete('/:taskid', auth.isBearerAuthenticated,
    (req, res) => {
        todoController.deleteTodo(req, res);
});

// Update un Todo
router.put('/:taskid', auth.isBearerAuthenticated,
    (req, res) => {
        todoController.updateTodo(req, res);
});

module.exports = router;