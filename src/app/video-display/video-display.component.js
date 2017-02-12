import template from './video-display.template.html';
let Peer = require('simple-peer');

const controller = [
  'socket', '$scope', 'currentUser', 'videoChat', 'appState', 'socketListeners',
    function(socket, $scope, currentUser, videoChat, appState, socketListeners) {
  const vm = this;


      //I hate doing it this way
  let height = $('.michael-jordan-video-chat-wrapper').css('width');
  $('.michael-jordan-video-chat-wrapper').css('height', height);
  height = $('.michael-jordan-screen').css('width');
  $('.michael-jordan-video-screen').css('height', height);

  vm.$onInit = function() {
    vm.currentUser = currentUser;
    vm.appState = appState;
    vm.isOnCall = true; // TEMPORARY
    vm.acceptOrDecline = false;
  }


  socketListeners.on('incoming-call', function(obj) {
    console.log('INCOMING CALL');
    appState.isOnCall = true;
    vm.appState.acceptOrDecline = true;
    vm.answerCall = function () {
      vm.appState.acceptOrDecline = false;
      videoChat.powerOn(obj);
    }
  });

  socketListeners.on('accepted-call', function(obj) {
    videoChat.makeCallHappen(obj);
  });

  vm.hangUp = function() {
    console.log('hanging up');
    //Do the simplepeer.js stuff needed to disconnect
    appState.isOnCall = false;
  }

}]

module.exports = {
  template,
  controller,
  bindings: {
    isOnCall: '='
  }
}
