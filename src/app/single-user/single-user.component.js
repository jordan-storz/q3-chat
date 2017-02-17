import template from './single-user.template.html';
import R from 'ramda';

const controller = [
  '$rootScope', '$scope', 'currentUser', 'socket', 'videoChat', 'userHttp', 'socketListeners', 'storage',
  'events',
  function($rootScope, $scope, currentUser, socket, videoChat, userHttp, socketListeners, storage, events) {
  const vm = this;
  vm.iteration = 0;

  vm.isBlocked = false;

  vm.$onInit = function () {
    vm.isTyping = false;
    vm.currentUser = currentUser;
    vm.hideOptionsWithThisUser = true;
    socketListeners.on('new-user-block', data => {
      console.log('DATA');
      console.log(data);
      if (data.blocker_id === vm.user.id) {
        console.log('BLOCKER ID');
        console.log(data.blocker_id);
        let eventInfo = {
          id: data.blocker_id,
          scopeApply: true
        }
        events.emit('block-messages', eventInfo);
        vm.isBlocked = true;
        $scope.$apply();
      }
    });

    socketListeners.on(`${vm.user.id}-user-typing`, function(data) {
      console.log('SOMEONE IS TYPING', vm.iteration);
      if((vm.iteration % 3) === 0) {
        $(`#${vm.user.id}-single-user`).fadeOut(500);
        $(`#${vm.user.id}-single-user`).fadeIn(500);
      }
      vm.iteration++;
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
    let eventInfo = {
      id: vm.user.id,
      scopeApply: false
    };
    events.emit('block-messages', eventInfo);
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
