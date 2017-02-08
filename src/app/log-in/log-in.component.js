import $ from "jquery";
import template from './log-in.template.html';

const controller = ['socket', 'roomUsers', 'currentUser', function(socket, roomUsers, currentUser) {
  const vm = this;

  vm.$onInit = function () {

    let width = $(`.chat-room-wrapper`).css('width');
    let height = $(`.chat-room-wrapper`).css('height');
    $(`.michael-jordan-log-in`).css('width', width);
    $(`.michael-jordan-log-in`).css('height', height);
  }

  vm.doLogIn = function() {
    currentUser.set({
      name: vm.username
    })

    socket.emit('whos-here', currentUser.get());
    vm.showLogIn = false; // if it doesnt pass the backend validation dont do this
  }
}];


module.exports = {
  template,
  controller,
  bindings: {
    isOnCall: '=',
    showLogIn: '='
  }
}
