import template from './single-user.template.html';
import R from 'ramda';

const controller = [
  '$rootScope', '$scope', 'currentUser', 'socket', 'videoChat', 'userHttp', 'socketListeners',
  function($rootScope, $scope, currentUser, socket, videoChat, userHttp, socketListeners) {
  const vm = this;

  vm.isBlocked = false;

  vm.$onInit = function () {
    vm.currentUser = currentUser;
    vm.hideOptionsWithThisUser = true;
    socketListeners.on('new-user-block', data => {
      if (data.blocker_id === vm.user.id) {
        vm.isBlocked = true;
      }
    });
  }

  vm.displayOptionsWithThisUser = function() {
    vm.hideOptionsWithThisUser = !vm.hideOptionsWithThisUser;
    console.log(vm.hideOptionsWithThisUser);
  }

  vm.blockUser = function() {
    vm.isBlocked = true;
    console.log(`blocking: ${vm.user.username}`);
    console.log(vm.user.id);
    currentUser.blockedUsers.push(vm.user.id);
    storage.setCurrentUser(currentUser);
    let body = {
      blocker_id: currentUser.id,
      blockee_id: vm.user.id
    };
    socket.emit('block-me', body);
    userHttp.createBlock(body)
      .then(function(res) {

      });
  }

  vm.startVidChat = function() {
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
