console.log('loading background');
console.log($);
console.log(io);



(function() {

  let elements = $('*').toArray();
  let maxZIndex = elements
    .map(element => {
      return parseInt($(element).css('z-index'));
    })
    .filter(zIndex => {
      return !!zIndex;
    })
    .reduce((acc, val) => {
      return val > acc ? val : acc;
    }, 0)



  const socketEndpoint = 'https://mj-sockets.herokuapp.com/';
  const socket = io.connect(socketEndpoint);
  const chatZIndex = maxZIndex + 1;
  console.log('chatZ');
  console.log(chatZIndex);

  let $video = $('<video id="mj-chat-video"></video>');
  $video.draggable();
  $video.css({
    display: 'none',
    height: '200px',
    width: '200px',
    position: 'fixed',
    border: '2px solid red',
    zIndex: chatZIndex
  });
  $('body').append($video);

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
            console.log('MESSAGE INFO:');
            console.log(message);
            let callInfo = {
              callerUsername: message.callerUsername,
              fromId: message.fromId,
              toId: message.toId,
              fromKey: JSON.stringify(data)
            }
            socket.emit('request-video-chat', callInfo);
          });
          socket.on(`${message.fromId}-accepted-call`, (data) => {
            console.log('ACCEPTED CALL');
            console.log(data);
            peer.signal(data.fromKey);
          });
          peer.on('stream', (stream) => {
            console.log('streaming!!');
            $video.css({
              display: 'block',
            })
            $video.attr('src', window.URL.createObjectURL(stream));
            $video.get(0).play();
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
              callerUsername: message.callerUsername,
              fromId: message.toId,
              toId: message.fromId,
              fromKey: JSON.stringify(data)
            }
            socket.emit('accept-video-chat', callInfo);
          });
          peer.on('stream', (stream) => {
            console.log('streaming!!');
            $video.css({
              display: 'block',
            })
            $video.attr('src', window.URL.createObjectURL(stream));
            $video.get(0).play();
          })
        }
      }




    });


  });





}());
