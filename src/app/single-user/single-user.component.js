import template from './single-user.template.html';
import R from 'ramda';

const controller = [
  '$rootScope', '$scope', 'currentUser', 'socket', 'videoChat', 'userHttp', 'socketListeners', 'storage',
  'events',
  function($rootScope, $scope, currentUser, socket, videoChat, userHttp, socketListeners, storage, events) {
  const vm = this;

  vm.isBlocked = false;

  vm.$onInit = function () {
    vm.currentUser = currentUser;
    vm.hideOptionsWithThisUser = true;
    socketListeners.on('new-user-block', data => {
      if (data.blocker_id === vm.user.id) {
        events.emit('block-messages', data.blocker_id);
        vm.isBlocked = true;
        $scope.$apply();
      }
    });
  }

  vm.displayOptionsWithThisUser = function() {
    vm.hideOptionsWithThisUser = !vm.hideOptionsWithThisUser;
    console.log(vm.hideOptionsWithThisUser);
  }

  vm.blockUser = function() {
    vm.isBlocked = true;
    currentUser.blockUsers.push(vm.user.id);
    storage.setCurrentUser(currentUser);
    let body = {
      blocker_id: currentUser.id,
      blockee_id: vm.user.id
    };
    events.emit('block-messages', vm.user.id);
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
