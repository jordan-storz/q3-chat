import io from 'socket.io-client';

module.exports = function() {
  console.log(io);
  const service = this;

  const socket = io.connect('http://127.0.0.1:4200');
  console.log(service.socket);


  service.firstContact = function(obj) {
      socket.emit('first-contact', obj);
  }




  // if(socket !== undefined) {
  //
  //   service.firstContact = function(obj) {
  //     socket.emit('first-contact', obj);
  //   }
  //
  //   service.existingPosts = function() {
  //     return socket.on('existing-posts', function(data) {
  //       return Promise.resolve(data.messageRay);
  //     });
  //   }
  //
  //   service.getMessages = function() {
  //     return service.messages;
  //   }
  //
  // }
}
