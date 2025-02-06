var app = require('express')();
var express = require('express')
var http = require('http').Server(app);
var io = require('socket.io')(http);
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb+srv://sa:yi2aIEN6FXTDF3bq@comp3123.f7zmt.mongodb.net/?retryWrites=true&w=majority&appName=comp3123', {
   useNewUrlParser: true,
   useUnifiedTopology: true
 }).then(success => {
   console.log('Success Mongodb connection')
 }).catch(err => {
   console.log('Error Mongodb connection')
 });

 app.use(express.json());

// routes
app.get('/', function(req, res) {
   res.sendfile('signup.html');
});

app.get('/login', function(req, res) {
   res.sendfile('login.html');
});

app.get('/home', function(req, res) {
   res.sendfile('home.html');
});

app.post('/login', (req, res) => {
   const { username, password } = req.body; 
   User.findOne({ username: username, password: password })
      .then(user => {
         if(user){
            res.send("Login successful")
         }else{
            console.log(user)
            res.send("No user found. Login failed.")
         }
      }).catch(err => {
         console.error(err);
       });
});

app.post('/signup', (req, res) => {
   const { username, firstname, lastname, password } = req.body;
   const newUser = new User({ username, firstname, lastname, password });
   newUser.save()
       .then(() => res.send('User registered'))
       .catch(err => res.status(500).send('Error saving user'));
});




users = [];
io.on('connection', function(socket) {
   console.log('A user connected');
   socket.on('setUser', function(data) {
      console.log(data);
      
      if(users.indexOf(data) > -1) {
         socket.emit('userExists', data + ' username is taken! Try some other username.');
      } else {
         users.push(data.username);
         socket.emit('userSet', {username: data});
      }
   });
   
   socket.on('msg', function(data) {
      //Send message to everyone
      io.sockets.emit('newmsg', data);
   })

   socket.on('hello', (msg) => {
        console.log(`Hello from : ${msg}`)
        const payload = {
            status: true,
            id: socket.id,
            message: 'Welcome to Chat Server'
        }
        socket.emit('welcome', payload)
    })

    socket.on('chat_message', (message)=> {
        console.log(`New message received: ${socket.id}|| ${message}`)
        // ioServer.emit('new_message', message)//send to all including sender
        socket.broadcast.emit('new_message', message)//send to all including sender
    })

    socket.on('join_group', (group_name)=>{
        socket.join(group_name)
        ioServer.to(group_name).emit('new_message', 'world');
    })

    socket.on('leave_group', (group_name)=>{
        socket.leave(group_name)
    })
});

http.listen(3002, function() {
   console.log('listening on localhost:3002');
});