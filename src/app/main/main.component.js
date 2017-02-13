import template from './main.template.html';

const controller = [
  'currentRoom', 'currentUser', 'appState', 'socketListeners', '$location',
  function(currentRoom, currentUser, appState, socketListeners, $location) {
    const vm = this;

    vm.$onInit = function() {
      vm.thisUrl = $location.absUrl();
      vm.appState = appState;
      currentRoom.get().then(room => {
        appState.room = room;
        socketListeners.initialize(room);
        socketListeners.on('initialize-id', (data) => {
          currentUser.socketId = data.id;
        });
      });
    }
}];

module.exports = {
  template,
  controller
}
