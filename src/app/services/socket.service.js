import io from 'socket.io-client';

module.exports = function() {
  const service = this;

  service.firstContact = function(obj) {
    socket.emit('first-contact', obj);
  }

  return io.connect('http://127.0.0.1:4200');
}
