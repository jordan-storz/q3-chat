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

  let $container = $('<div id="mj-chat-1256129"></div>');
  let $video = $('<video id="mj-chat-video"></video>');
  let $hangupBtn = $(`<img src="https://cdn.yelophone.com/www/v1/images/icons/hangup_action_red.png" alt="hang up" id="mj-chat-hangup-btn"/>`);

  $container.append($video);
  $container.append($hangupBtn);
  $container.draggable();
  $container.css({
    boxSizing: 'border-box',
    backgroundColor: 'green',
    display: 'none',
    height: '150px',
    width: '200px',
    position: 'fixed',
    zIndex: chatZIndex,
    border: '1px solid black',
  });
  $video.css({
    boxSizing: 'border-box',
    border: '1px solid white',
    height: '148px',
    width: '198px',
    zIndex: chatZIndex
  });
  $hangupBtn.css({
    width: '30px',
    position: 'absolute',
    bottom: '10px',
    left: 'calc(50% - 15px)'
  });



  $('body').prepend($container);



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
            $container.css({
              display: 'block',
            })
            $video.attr('src', window.URL.createObjectURL(stream));
            $video.get(0).play();
          })
          peer.on('close', () => {
            hideVideoChat();
          });
          $hangupBtn.click(event => {
            peer.destroy();
            $video.attr('src', '');
          });
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
            $container.css({
              display: 'block',
            })
            $video.attr('src', window.URL.createObjectURL(stream));
            $video.get(0).play();
          })
          peer.on('close', () => {
            hideVideoChat();
          });
          $hangupBtn.click(event => {
            peer.destroy();
            $video.attr('src', '');
          });
        }
      }
    });

    function hideVideoChat() {
      $container.css({
        display: 'none'
      })
    }
  });





}());
