const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/todolist_db').then((result) => {
    console.log('berhhasil konek ke mongo');
    }).catch((err) => {
        console.log(err);
    })
const todoSchema = new mongoose.Schema({
    text : {
        type : String,
        required: [true, 'title is required']
    },
})


const Todo = mongoose.model('todo', todoSchema)



const TodoSeed = [
    {
        "text": "Rayco",
    },
    {
        "text": "Sajiku",
    },
    {
        "text": "Marry with A",
    },

]

Todo.insertMany(TodoSeed)
