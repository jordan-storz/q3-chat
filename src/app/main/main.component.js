import template from './main.template.html';

const controller = [
  'currentRoom', 'currentUser', 'appState',
  function(currentRoom, currentUser, appState) {
    const vm = this;

    vm.$onInit = function() {
      currentRoom.get().then(room => {
        appState('room', room);
        vm.currentRoom = room;
      });
    }
}];

module.exports = {
  template,
  controller
}
