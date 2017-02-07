import $ from "jquery";
import template from './log-in.template.html';

const controller = ['socket', function(socket) {
  const vm = this;

  vm.$onInit = function () {
    let width = $(`.chat-room-wrapper`).css('width');
    let height = $(`.chat-room-wrapper`).css('height');
    $(`.michael-jordan-log-in`).css('width', width);
    $(`.michael-jordan-log-in`).css('height', height);
  }

  vm.doLogIn = function() {
    console.log('logging in: ', vm.currentUser);
    vm.currentUser.name = vm.username;
    vm.showLogIn = false; // if it doesnt pass the backend validation dont do this
  }
}];


module.exports = {
  template,
  controller,
  bindings: {
    currentUser: '=',
    isOnCall: '=',
    showLogIn: '='
  }
}
