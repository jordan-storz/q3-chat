import $ from "jquery";
import template from './chat-display.template.html';
import R from 'ramda';

const controller = [
  'socket', '$scope', 'roomHttp', 'currentUser',
  function(socket, $scope, roomHttp, currentUser) {
    const vm = this;
    vm.minimize = false;
    vm.messages = [];
    vm.users = [];
    vm.showLogIn = true;

    vm.$onInit = function() {
      vm.currentUser = currentUser.get();
      // socket.emit('first-contact', {url: vm.currentUser.room});
      roomHttp.getRoom().then(response => {
        let room = response.data.room;
        let messages = response.data.messages;
        vm.messages = messages;
        vm.room = room;
      })
    }

    socket.on('initialize-id', function(data) {
      console.log('INITIALIZEDATA: ');
      console.log(data);
      vm.currentUser.socketId = data.id;
      $scope.$apply();
    });

    vm.minimizeBox = function() {
      vm.minimize = !vm.minimize;
    }

    vm.increaseOpacity = function() {
        let opac = parseFloat($('.chat-room-wrapper ').css('opacity')) + .1;
        if (opac >= 1) opac = 1;
        $('.chat-room-wrapper ').css('opacity', opac);
    }

    vm.decreaseOpacity = function() {
        let opac = parseFloat($('.chat-room-wrapper ').css('opacity')) - .1;
        if (opac <= .1) opac = .1;
        $('.chat-room-wrapper ').css('opacity', opac);
    }

}]

module.exports = {
    template,
    controller,
    bindings: {
      isOnCall: '='
    }
}
