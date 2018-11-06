const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('debug', true);

const SharedSchema = new Schema({name: String});
const TodoSchema = new Schema({
    listName: {
        type: String,
        required: true
    },
    taskName: {
        type: String,
        required: true
    },
    User: {
        type: String,
        required: true
    },
    UserShared:{
        type: [SharedSchema],
        default: undefined
    },
    dateEnd: {
        type: Date,
        default: undefined
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Todos', TodoSchema);