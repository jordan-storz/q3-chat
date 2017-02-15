import template from './messages-list.template.html';
import R from 'ramda';

const controller = [
  'socket', '$scope', 'currentUser', 'appState', 'socketListeners', 'events',
  function(socket, $scope, currentUser, appState, socketListeners, events) {
  const vm = this;

  vm.$onInit = function() {
    vm.currentUser = currentUser;
    events.on('block-messages', eventInfo => {
      vm.messages = vm.messages.filter(message => {
        return message.user.id !== eventInfo.id
      });
      if (eventInfo.scopeApply) {
        $scope.$apply();
      }
    });

    socketListeners.on(`room-new-message`, function(data) {
      if (!R.contains(data.userId, currentUser.blockUsers)) {
        let message = {
          user: {
            username: data.username,
            id: data.userId
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
