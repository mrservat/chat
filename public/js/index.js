var socket = io();

socket.on('connect', function () {
  console.log('connected to server');

});

socket.on('newMessage', function (msg) {
  console.log('newMessage', msg);
  var li = $('<li></li>');
  li.text(`${msg.from}: ${msg.text}`);
  $('#messages').append(li);
});

socket.on('disconnect', function () {
  console.log('disconnect from server');
});

socket.on('newEmail', function (email) {
  console.log('New Email', email);
});


$('#message-form').on('submit', function(e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'David',
    text: $('[name=message]').val()
  }, function (data){
    $('[name=message]').val('');
    console.log(data);
  });

});
