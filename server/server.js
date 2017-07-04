const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;


var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined',
    createAt: new Date().getTime()
  });

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Wellcome!!!',
    createAt: new Date().getTime()
  });


  socket.on('createMessage', (msg) => {
    console.log('createMessage', msg);
    io.emit('newMessage', {
      from: msg.from,
      text: msg.text,
      createAt: new Date().getTime()
    });

    // socket.broadcast.emit('newMessage', {
    //   from: msg.from,
    //   text: msg.text,
    //   createAt: new Date().getTime()
    // });

  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

});

// socket.on('createEmail', (newEmail) => {
//   console.log('createEmail', newEmail);
// });


server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
