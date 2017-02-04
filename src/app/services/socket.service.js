module.exports = function() {
  const service = this;

  let socket = io.connect('http://127.0.0.1:3000');

  if(socket !== undefined) {

    service.firstContact = function(obj) {
      socket.emit('first-contact', obj);
    }

    service.existingPosts = function() {
      return socket.on('existing-posts', function(data) {
        return Promise.resolve(data.messageRay);
      });
    }

    service.getMessages = function() {
      return service.messages;
    }

  }
}
