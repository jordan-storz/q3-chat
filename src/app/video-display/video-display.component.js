import template from './video-display.template.html';
let Peer = require('simple-peer');

const controller = ['socket', '$scope', 'currentUser', 'videoChat', function(socket, $scope, currentUser, videoChat) {
  const vm = this;


      //I hate doing it this way
  let height = $('.michael-jordan-video-chat-wrapper').css('width');
  $('.michael-jordan-video-chat-wrapper').css('height', height);
  height = $('.michael-jordan-screen').css('width');
  $('.michael-jordan-video-screen').css('height', height);

  vm.$onInit = function() {
    vm.currentUser = currentUser.get();
    vm.isOnCall = true; // TEMPORARY
    vm.acceptOrDecline = false;
    console.log('vm.acceptOrDecline: ', vm.acceptOrDecline);
    console.log(vm.currentUser);
  }


  socket.on('initialize-id', function(data) {
    vm.currentUser.socketId = data.id;
    socket.on(`${vm.currentUser.socketId}-incoming-call`, function(obj) {
      console.log("RECEIVING CALL");
      vm.currentUser.isOnCall = true;
      vm.currentUser.acceptOrDecline = true;
      vm.currentUser.initiator = false;
      $scope.$apply();
      vm.answerCall = function () {
        vm.currentUser.acceptOrDecline = false;
        videoChat.powerOn(obj);
      }
    });
    socket.on(`${vm.currentUser.socketId}-accepted-call`, function(obj) {
      console.log("THEY ACCEPTED YOUR CALL!!!!");
      videoChat.makeCallHappen(obj);
    });
    $scope.$apply();
  });


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
