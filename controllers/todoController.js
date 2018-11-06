const Todo = require('./../models/todo');

/**
 * return all task
 */
exports.listAllTodos = (req, res) => {
    Todo.find({}, (err, todos) => {
        if (err) {
            res.status(500).send(err);
        }

        res.status(200).json(todos);
    });
};

/**
 * create new task
 */
exports.createNewTodo = (req, res) => {
    let newTodo = new Todo(req.body);
    newTodo.save((err, todo) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(201).json(todo);
    });
};

/**
 * return unique task pass by parameter
 */
exports.readTodo = (req, res) => {
    Todo.findById(req.params.taskid, (err, todo) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(todo);
    });
};

/**
 * update unique task pass by parameter
 */
exports.updateTodo = (req, res) => {
    Todo.findOneAndUpdate({
            _id: req.params.taskid
        },
        req.body, {
            new: true
        },
        (err, todo) => {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).json(todo);
        }
    );
};

/**
 * delete task pass by parameter
 */
exports.deleteTodo = (req, res) => {
    Todo.deleteOne({
        _id: req.params.taskid
    }, (err, todo) => {
        if (err) {
            res.status(404).send(err);
        }
        
        //res.status(200).json({message: "Todo successfully deleted"});
        
        // return all
        Todo.find({}, (err, todos) => {
            if (err) {
                res.status(500).send(err);
            }
    
            res.status(200).json(todos);
        });
    });
};