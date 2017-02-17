import R from 'ramda';

import template from './video-display.template.html';
let Peer = require('simple-peer');

const controller = [
  'socket', '$scope', 'currentUser', 'videoChat', 'appState', 'socketListeners', 'contentMessage', function(socket, $scope, currentUser, videoChat, appState, socketListeners, contentMessage) {
  const vm = this;

  vm.$onInit = function() {
    vm.currentUser = currentUser;
    vm.isOnCall = false;
  }

  socketListeners.on('incoming-call', function(obj) {
    vm.isOnCall = true;
    vm.acceptOrDecline = true;
    vm.callerUsername = obj.callerUsername;
    $('div.message-list-container').css({
      color: 'transparent',
      display: 'none'
    });
    vm.answerCall = function () {
      $('div.message-list-container').css({
        color: 'black',
        display: 'block'
      });
      vm.isOnCall = false;
      let message = R.merge(obj, {messageName: 'acceptCall'})
      contentMessage.sendMessage(message);
    }
    vm.declineCall = function () {
      $('div.message-list-container').css({
        color: 'black',
        display: 'block'
      });
      vm.isOnCall = false;
    }
    $scope.$apply();
  });

}]

module.exports = {
  template,
  controller
}
