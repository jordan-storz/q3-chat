import template from './message-input.template.html';
import R from 'ramda';

const controller = [
  '$scope', 'currentUser', 'socket', 'appState', 'messageHttp',
  function($scope, currentUser, socket, appState, messageHttp) {
    const vm = this;

    vm.$onInit = function() {}

    vm.sendMessage = function() {
      if(vm.messageArea !== '') {
        let messageInfo = {
          userId: currentUser.id,
          username: currentUser.username,
          room: appState.room,
          message: vm.messageArea
        };
        vm.messageArea = '';
        socket.emit('send-message', messageInfo);
        messageHttp.postMessage(messageInfo);
      }
    }

}]

module.exports = {
    template,
    controller,
    bindings: {
      isOnCall: '='
    }
}
