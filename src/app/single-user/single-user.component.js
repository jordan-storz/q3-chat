import template from './single-user.template.html';

const controller = [
  '$scope', 'currentUser', 'socket',
  function($scope, currentUser, socket) {
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
    vm.isOnCall = true;
    vm.currentUser.initiator = true;
    console.log(vm.currentUser);
    let obj = {
      fromId: vm.currentUser.socketId,
      toId: user.socketId,
      fromkey: 'key'
    }
    socket.emit('request-video-chat', obj);
  }
}];


module.exports = {
  template,
  controller,
  bindings: {
    user: "="
  }
}
