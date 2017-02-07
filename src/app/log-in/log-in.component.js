import $ from "jquery";
import template from './log-in.template.html';

const controller = ['socket', function(socket) {
  const vm = this;

  vm.$onInit = function () {
    console.log('Logging in');
    let width = $(`.chat-room-wrapper`).css('width');
    let height = $(`.chat-room-wrapper`).css('height');
    $(`.michael-jordan-log-in`).css('width', width);
    $(`.michael-jordan-log-in`).css('height', height);
    $('#michael-jordan-get-user-password').css('z-index', 11001).css('color', 'black').css('opacity', 1);
    $('#michael-jordan-get-user-username').css('z-index', 11001);

    vm.doLogIn = function() {
      console.log('logging in');
    }
  }
}];


module.exports = {
  template,
  controller
}
