import template from './main.template.html';

const controller = ['currentRoom', 'currentUser', function(currentRoom, currentUser) {
  const vm = this;

  vm.$onInit = function() {
    vm.currentUser = currentUser.get();
    vm.isOnCall = false;
  }
}];

module.exports = {
  template,
  controller
}
