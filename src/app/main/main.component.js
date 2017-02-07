import template from './main.template.html';

const controller = ['currentRoom', function(currentRoom) {
  const vm = this;

  vm.$onInit = function() {
    vm.isOnCall = false;
    vm.currentUser = {
      room: currentRoom.is(),
      name: 'Mike'
    }
  }
}];

module.exports = {
  template,
  controller
}
