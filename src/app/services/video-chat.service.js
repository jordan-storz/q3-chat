const Peer = require('simple-peer');

module.exports = ['socket', 'currentUser', 'contentMessage', function(socket, currentUser, contentMessage) {
  const service = this;

  service.currentUser = currentUser;

  service.powerOn = function (user) {
    contentMessage.sendMessage({
      messageName: 'startCall',
      callerUsername: currentUser.username,
      fromId: service.currentUser.socketId,
      toId: user.socketId
    });
  }
  
}];
