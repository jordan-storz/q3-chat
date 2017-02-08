import template from './video-display.template.html';
let Peer = require('simple-peer');

const controller = ['socket', '$scope', 'currentUser', function(socket, $scope, currentUser) {
  const vm = this;


      //I hate doing it this way
  let height = $('.michael-jordan-video-chat-wrapper').css('width');
  $('.michael-jordan-video-chat-wrapper').css('height', height);
  height = $('.michael-jordan-screen').css('width');
  $('.michael-jordan-video-screen').css('height', height);

  vm.$onInit = function() {
    vm.currentUser = currentUser.get();
    vm.acceptOrDecline = !vm.currentUser.initiator;
    console.log('vm.acceptOrDecline: ', vm.acceptOrDecline);
    console.log(vm.currentUser);

    vm.gotMedia = function(stream) {
      vm.peer = new Peer({
          initiator: vm.currentUser.initiator,
          trickle: false,
          stream: stream
      })

      vm.peer.on('signal', function (data) {
        //document.querySelector('#outgoing').textContent = JSON.stringify(data)
        vm.outgoing = JSON.stringify(data);
        $scope.$apply();
      })

      // document.querySelector('form').addEventListener('submit', function (ev) {
      //   ev.preventDefault()
      //   vm.peer.signal(JSON.parse(document.querySelector('#incoming').value))
      // })

      vm.peer.on('stream', function (stream) {
        var video = document.querySelector('video')
        video.src = window.URL.createObjectURL(stream)
        $scope.$apply
        video.play()
      })
    }

    navigator.getUserMedia({ video: true, audio: true }, vm.gotMedia, function () {})

  }

  vm.hangUp = function() {
    console.log('hanging up');
    //Do the simplepeer.js stuff needed to disconnect
    vm.isOnCall = false;
  }

}]

module.exports = {
  template,
  controller,
  bindings: {
    isOnCall: '='
  }
}
