import $ from "jquery";
import template from './log-in.template.html';
import R from 'ramda';

const controller = [
  'socket', 'currentUser', 'appState', 'storage',
  function(socket, currentUser, appState, storage) {
  const vm = this;

  vm.$onInit = function () {

    vm.currentUser = storage.getCurrentUser();

    let width = $(`.chat-room-wrapper`).css('width');
    let height = $(`.chat-room-wrapper`).css('height');
    $(`.michael-jordan-log-in`).css('width', width);
    $(`.michael-jordan-log-in`).css('height', height);
  }

  vm.doLogIn = function() {

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
