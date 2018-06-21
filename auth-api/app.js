const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://127.0.0.1:27017/apiUsers');
const User = require('./models/userModel');
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// app.get('/', (req, res) => res.send('Hello World to the TODO API!'));
// for fullstack apps
// app.set('view engine', 'pug');
// // this is where we can put the public contents like css and js files
// app.use(express.static(__dirname + '/public'));


// app.get('/', (req, res) => {
//     res.render('index', {
//         title: 'Main Title',
//         content: 'The content of the page'
//     })
// });

// responding with json
// app.get('/api/tasks', (req, res) => {
//     res.json([{
//         id: 1,
//         title: 'Task title 1'
//     }, {
//         id: 2,
//         title: 'Task title 2'
//     }]);
// });

// with mongo
app.get('/api/users', (req, res) => {
    User.find(function(err, users){
        if(err) {
            res.send(err);
        }
        res.json(users);
    });
});

app.post('/api/users', (req, res) => {
    var user = new User();
    
    user.name = req.body.name;
    user.age = req.body.age;
    user.phone = req.body.phone;

    user.save(function(err){
        if(err) {
            res.send(err);
        }
        res.status(201);
        res.json(user);
    });
});
// handle 404
app.use(function(req, res, next){
    res.status(404);
    res.send({ error: 'Not found' });
    return;
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));