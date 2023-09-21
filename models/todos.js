const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    text : {
        type : String,
        required: [true, 'title is required']
    },
})


const Todo = mongoose.model('todo', todoSchema)


module.export = Todo