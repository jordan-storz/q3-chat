import template from './single-user.template.html';

const controller = [
  '$rootScope', '$scope', 'currentUser', 'socket', 'videoChat', 'userHttp',
  function($rootScope, $scope, currentUser, socket, videoChat, userHttp) {
  const vm = this;

  vm.$onInit = function () {
    vm.currentUser = currentUser;
    vm.hideOptionsWithThisUser = true;
  }

  vm.displayOptionsWithThisUser = function() {
    vm.hideOptionsWithThisUser = !vm.hideOptionsWithThisUser;
    console.log(vm.hideOptionsWithThisUser);
  }

  vm.blockUser = function() {
    console.log(`blocking: ${vm.user.username}`);
    console.log(vm.user.id);
    currentUser.blockedUsers.push(vm.user.id);
    let body = {
      blocker_id: currentUser.id,
      blockee_id: vm.user.id
    };

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
