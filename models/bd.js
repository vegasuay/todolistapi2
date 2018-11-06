//Set up mongoose connection
const mongoose = require("mongoose");
const user=process.env.MONGODB_USER;
const pass=process.env.MONGODB_PASS;
const passURI = encodeURIComponent('Wsxcde10#');
const options = {
    reconnectTries: Number.MAX_VALUE,
    poolSize: 10,
    useNewUrlParser:true
};
  
const uri = 'mongodb+srv://vegasuay:'+passURI+'@cluster0-shzfp.mongodb.net/todoDB?retryWrites=true';

mongoose.connect(uri, options).then(
    () => {
        console.log("Database connection established!");
    },
    err => {
        console.log("Error connecting Database instance due to: ", err);
    }
);

require("./todo");
  