import template from './single-message.template.html';

const controller = ['events','currentUser', 'storage', 'socket', 'userHttp', function (events, currentUser, storage, socket, userHttp) {
  const vm = this;

  vm.$onInit = function () {
    vm.showOptions = false;
    listen(vm.message.user.username);
  }

  function listen (username) {
    events.on(`${username}-name-change`, username => {
      vm.message.user.username = username;
      listen(username);
    });
  }

  vm.toggleOptions = function () {
    vm.showOptions = !vm.showOptions;
  }

  vm.blockUser = function() {
    vm.isBlocked = true;
    currentUser.blockUsers.push(vm.message.user.id);
    storage.setCurrentUser(currentUser);
    let body = {
      blocker_id: currentUser.id,
      blockee_id: vm.message.user.id
    };
    let eventInfo = {
      id: vm.message.user.id,
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
    videoChat.powerOn(vm.message);
  }
}]


module.exports = {
  template,
  controller,
  bindings: {
    message: "="
  }
}
