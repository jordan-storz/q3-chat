import template from './main.template.html';

const controller = ['currentRoom', 'currentUser', function(currentRoom, currentUser) {
  const vm = this;

  vm.$onInit = function() {
    currentRoom.get().then(room => vm.currentRoom = room);
    vm.currentUser = currentUser.get();
    vm.isOnCall = false;
  }
}];

module.exports = {
  template,
  controller
}
