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
      console.log('GOT MEDIA');
      console.log(service.currentUser.initiator);
      service.peer = new Peer({
        initiator: service.currentUser.initiator,
        trickle: false,
        stream: stream
      });

      if (!service.currentUser.initiator) {
        service.peer.signal(user.fromKey);
      }


      service.peer.on('signal', function (data) {
        console.log('USERRRR');
        console.log(user);
        //document.querySelector('#outgoing').textContent = JSON.stringify(data)
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
          console.log("SENDING ACCEPT");
          socket.emit('accept-video-chat', obj);
        }
      });

      // document.querySelector('form').addEventListener('submit', function (ev) {
      //   ev.preventDefault()
      //   vm.peer.signal(JSON.parse(document.querySelector('#incoming').value))
      // })

      service.peer.on('stream', function (stream) {
        var video = document.querySelector('video')
        video.src = window.URL.createObjectURL(stream)
        video.play()
      })
    }

    let contraints = { video: true, audio: true };
    navigator.getUserMedia({ video: true, audio: true }, service.gotMedia, function () {})
  }
}];
