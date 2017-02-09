import template from './single-user.template.html';

const controller = [
  '$rootScope', '$scope', 'currentUser', 'socket', 'videoChat',
  function($rootScope, $scope, currentUser, socket, videoChat) {
  const vm = this;

  vm.$onInit = function () {
    vm.currentUser = currentUser.get();
    vm.hideOptionsWithThisUser = true;
  }

  vm.displayOptionsWithThisUser = function() {
    vm.hideOptionsWithThisUser = !vm.hideOptionsWithThisUser;
    console.log(vm.hideOptionsWithThisUser);
  }

  vm.blockUser = function(user) {
    console.log(`blocking: ${user.name}`);
    console.log(user);
  }

  vm.startVidChat = function(user) {
    console.log('Start video chat', user);
    vm.currentUser.isOnCall = true;
    vm.acceptOrDecline = false;
    vm.currentUser.initiator = true;
    videoChat.powerOn(vm.user);
  }
}];


module.exports = {
  template,
  controller,
  bindings: {
    user: "="
  }
}
