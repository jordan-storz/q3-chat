const Peer = require('simple-peer');

module.exports = ['socket', 'currentUser', function(socket, currentUser) {
  const service = this;

  service.currentUser = currentUser;
  service.state = {

  }

  service.makeCallHappen = function (obj) {
    service.peer.signal(obj.fromKey);
  }

  service.powerOn = function (user) {
    service.gotMedia = function(stream) {
      service.peer = new Peer({
        initiator: service.currentUser.initiator,
        trickle: false,
        stream: stream
      });

      if (!service.currentUser.initiator) {
        service.peer.signal(user.fromKey);
      }


      service.peer.on('signal', function (data) {
        if (service.currentUser.initiator) {
          let obj = {
            fromId: service.currentUser.socketId,
            toId: user.socketId,
            fromKey: JSON.stringify(data)
          }
          socket.emit('request-video-chat', obj);
        } else {
          let obj = {
            fromId: service.currentUser.socketId,
            toId: user.fromId,
            fromKey: JSON.stringify(data)
          }
          socket.emit('accept-video-chat', obj);
        }
      });

      service.peer.on('stream', function (stream) {
        var video = document.querySelector('video')
        video.src = window.URL.createObjectURL(stream)
        video.play()
      })
    }

    let contraints = { video: true, audio: true };
    navigator.getUserMedia({ video: true, audio: true }, service.gotMedia, console.error);
  }
}];
