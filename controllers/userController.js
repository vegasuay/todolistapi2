const User = require('./../models/auth/user');

// endpoint /api/users 
exports.newUser = (req, res) => {
    let user = new User(req.body);
    user.save((err, user) =>{
        if(err){
            res.status(500).send(err);
        }

        res.status(200).json({
            message: 'new user created!!',
            data: user
        });
    });
};

// find all users
exports.allUsers = (req, res) => {
    User.find((err, users) => {
        if(err){
            res.status(500).send(err);
        }

        res.status(200).json(users);
    });
};