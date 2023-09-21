const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const methodOverride = require('method-override')
const morgan = require('morgan')
const app = express()

morgan('tiny')

app.use(morgan('dev'))

mongoose.connect('mongodb://127.0.0.1:27017/todolist_db').then((result) => {
    console.log('berhasil konek ke mongo');
}).catch((err) => {
    console.log(err);
})

// models
const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'title is required']
    },
})


const Todo = mongoose.model('todo', todoSchema)


//ends
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
app.use(express.urlencoded({
    extended: true
}))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const todos = await Todo.find({});
    res.render('index', { todos })
})

app.post('/', async (req, res) => {
    const todo = new Todo(req.body)
    await todo.save();
    res.redirect('/')
})


app.delete('/todo/:id', async (req, res) => {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.redirect('/')
});



app.get('/kalender', (req, res) => {
    res.render('calendar')
})

app.use((req, res) => {
    res.status(404).render('Error404');
});

app.listen(1026, () => {
    console.log('app listen');
})
