import io from 'socket.io-client';

module.exports = function() {
  console.log(io);
  const service = this;

  return io.connect('http://127.0.0.1:3000');
}
