const express  = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

// load routes
const todos   = require('./routes/todo');
const users   = require('./routes/user');
const clients = require('./routes/client');
const oauth2  = require('./routes/oauth2');

const app = express();

// conexion bbdd
const db = require('./models/bd');

app.set("view engine","jade");

// configuracion
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

    res.setHeader("Access-Control-Expose-Headers", "Set-Cookie");
    res.setHeader("Access-Control-Allow-Credentials","true");

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-CSRF-Token, Content-Type, Accept, Authorization');

    // Pass to next layer of middleware
    next();
});

// passport
app.use(passport.initialize());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Use express session support since OAuth2orize requires it
app.use(session({
    secret: 'Wsxcde10',
    saveUninitialized: true,
    resave: true
}));

app.use('/api/todos', todos);
app.use('/api/users', users);
app.use('/api/clients', clients);
app.use('/api/oauth2', oauth2);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
  
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});

module.exports = app;