import $ from "jquery";
import template from './chat-display.template.html';
import R from 'ramda';

const controller = [
  'socket', '$scope', 'currentRoom', 'roomHttp',
  function(socket, $scope, currentRoom, roomHttp) {
    const vm = this;
    vm.user = { //This is gonna be a service
      url: currentRoom.is(),
      name: '',
      message: vm.messageArea
    };
    vm.minimize = false;
    vm.messages = [];
    vm.users = [];
    vm.hasAccount = true;

    vm.$onInit = function() {
      // socket.emit('first-contact', {url: vm.user.url});
      roomHttp.getRoom().then(response => {
        console.log('response: ');
        console.log(response);
        let room = response.data.room;
        let messages = response.data.messages;
        vm.messages = messages;
        vm.room = room;
      })
    }

    socket.on('start-up-info', function(data) {
      //also need back a socket id and a list of users with their socket ids;
      vm.user.name = data.name;
      vm.messages = data.messageRay;
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
    controller
}
