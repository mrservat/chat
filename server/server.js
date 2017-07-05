const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;
const {generateMessage} = require('./utils/message');


var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');
  socket.emit('newMessage',generateMessage('admin', 'Welcome!!!'));
  socket.broadcast.emit('newMessage', generateMessage('admin', 'New user joined'));

  socket.on('createMessage', (msg, callback) => {
    console.log('createMessage', msg);
    io.emit('newMessage', generateMessage(msg.from, msg.text));
    callback('this is from the server');
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
