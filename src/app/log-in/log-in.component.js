import $ from "jquery";
import template from './log-in.template.html';
import R from 'ramda';

const controller = [
  'socket', 'roomUsers', 'currentUser', 'appState',
  function(socket, roomUsers, currentUser, appState) {
  const vm = this;

  vm.$onInit = function () {

    let width = $(`.chat-room-wrapper`).css('width');
    let height = $(`.chat-room-wrapper`).css('height');
    $(`.michael-jordan-log-in`).css('width', width);
    $(`.michael-jordan-log-in`).css('height', height);
  }

  vm.doLogIn = function() {
    currentUser.username = vm.username;
    let info = {
      room: appState.room,
      user: currentUser
    }
    socket.emit('whos-here', info);
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
