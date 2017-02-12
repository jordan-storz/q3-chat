import template from './message-input.template.html';
import R from 'ramda';

const controller = [
  '$scope', 'currentUser', 'socket', 'appState',
  function($scope, currentUser, socket, appState) {
    const vm = this;

    vm.$onInit = function() {}

    vm.sendMessage = function() {
      console.log(appState);
      if(vm.messageArea !== '') {
        let messageInfo = {
          username: currentUser.username,
          room: appState.room,
          message: vm.messageArea
        };
        socket.emit('send-message', messageInfo);
        vm.messageArea = '';
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
