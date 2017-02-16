import R from 'ramda';

import template from './video-display.template.html';
let Peer = require('simple-peer');

const controller = [
  'socket', '$scope', 'currentUser', 'videoChat', 'appState', 'socketListeners', 'contentMessage',
    function(socket, $scope, currentUser, videoChat, appState, socketListeners, contentMessage) {
  const vm = this;

  let height = $('.michael-jordan-video-chat-wrapper').css('width');
  $('.michael-jordan-video-chat-wrapper').css('height', height);
  height = $('.michael-jordan-screen').css('width');
  $('.michael-jordan-video-screen').css('height', height);

  vm.$onInit = function() {
    vm.currentUser = currentUser;
    vm.isOnCall = false;
    vm.acceptOrDecline = false;
    $('div.message-list-container').css({
      color: 'transparent',
      display: 'none'
    });

  }

  socketListeners.on('incoming-call', function(obj) {
    console.log('INCOMING  OBJECT:');
    console.log(obj);
    vm.isOnCall = true;
    vm.acceptOrDecline = true;
    vm.callerUsername = obj.callerUsername;
    $('div.message-list-container').css({
      color: 'transparent'
    })
    vm.answerCall = function () {
      vm.acceptOrDecline = false;
      let message = R.merge(obj, {messageName: 'acceptCall'})
      contentMessage.sendMessage(message);
    }
    $scope.$apply();
  });


}]

module.exports = {
  template,
  controller
}
