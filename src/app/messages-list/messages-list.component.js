import template from './messages-list.template.html';
import R from 'ramda';

const controller = [
  'socket', '$scope', 'currentUser', 'appState', 'socketListeners', 'events',
  function(socket, $scope, currentUser, appState, socketListeners, events) {
  const vm = this;

  vm.$onInit = function() {
    vm.currentUser = currentUser;
    events.on('block-messages', id => {
      vm.messages = vm.messages.filter(message => {
        return message.user.id !== id;
      });
    });
    socketListeners.on(`room-new-message`, function(data) {
      if (!R.contains(data.userId, currentUser.blockUsers)) {
        let message = {
          user: {
            username: data.username
          },
          content: data.message
        }
        vm.messages.push(message);
        $scope.$apply();
      }
    });
  }
}];

module.exports = {
  template,
  controller,
  bindings: {
    messages: "=",
    isOnCall: '='
  }
}
