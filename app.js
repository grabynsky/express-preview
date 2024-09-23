const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const users = [
    {id:1, name: 'Maksym', email:'feden@gmail.com', password: 'qwe123'},
    {id:2, name: 'Alina', email:'alinados@gmail.com', password: 'ert123'},
];

app.get('/users', (req, res) => {
    res.send('Hello users');
})

app.post('/users', (req, res) => {
    console.log('body', req.body)
    console.log('query', req.query)
    console.log('params', req.params)
    res.send('Hello users 2');
})

app.post('/users/:userId', (req, res) => {
    console.log('params', req.params)
    res.send('Hello userId');
})

app.listen(3000)