var socket = io();

socket.on('connect', function () {
  console.log('connected to server');

});

socket.on('newMessage', function (msg) {
  console.log('newMessage', msg);
});

socket.on('disconnect', function () {
  console.log('disconnect from server');
});

socket.on('newEmail', function (email) {
  console.log('New Email', email);
});
