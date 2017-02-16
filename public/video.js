console.log('loading background');
console.log($);
console.log(io);



(function() {
  const socketEndpoint = 'https://mj-sockets.herokuapp.com/';
  const socket = io.connect(socketEndpoint);


  chrome.extension.onConnect.addListener(port => {
    console.log('connected!!');
    port.onMessage.addListener(message => {

      if (message.messageName === 'startCall') {
        navigator.getUserMedia({video: true, audio: true}, gotMediaSend, () => {});
        function gotMediaSend(stream) {
          let peer = new SimplePeer({
            initiator: true,
            trickle: false,
            stream: stream
          });
          peer.on('signal', (data) => {
            console.log(message);
            let callInfo = {
              fromId: message.fromId,
              toId: message.toId,
              fromKey: JSON.stringify(data)
            }
            socket.emit('request-video-chat', callInfo);
          });
          socket.on(`${message.fromId}-accepted-call`, (data) => {
            console.log('ACCEPTED CALL');
          });
          peer.on('stream', (stream) => {
            document.querySelector('video')
            video.src = window.URL.createObjectURL(stream);
            video.play()
          })
        }
      } else if (message.messageName === 'acceptCall') {
        console.log(message);
        navigator.getUserMedia({video: true, audio: true}, gotMediaReceive, () => {});
        function gotMediaReceive(stream) {
          console.log('GOT THE MEDIA');
          let peer = new SimplePeer({
            initiator: false,
            trickle: false,
            stream: stream
          });
          peer.signal(message.fromKey);
          peer.on('signal', (data) => {
            console.log('RECEIVED SIGNAL');
            let callInfo = {
              fromId: message.toId,
              toId: message.fromId,
              fromKey: JSON.stringify(data)
            }
            socket.emit('accept-video-chat', callInfo);
          });
          peer.on('stream', (stream) => {
            $('body').prepend($('<video class="mj-chat"></video>'));
            let video = document.querySelector('video.mj-chat');
            video.src = window.URL.createObjectURL(stream);
            video.play()
          })
        }
      }




    });


  });





}());
