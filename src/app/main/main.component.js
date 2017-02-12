import template from './main.template.html';

const controller = [
  'currentRoom', 'currentUser', 'appState', 'socketListeners',
  function(currentRoom, currentUser, appState, socketListeners) {
    const vm = this;

    vm.$onInit = function() {
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
