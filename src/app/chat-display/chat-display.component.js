import $ from "jquery";
import template from './chat-display.template.html';


const controller = ['socket', '$scope', 'currentRoom', function(socket, $scope, currentRoom) {
    const vm = this;
    vm.user = { //This is gonna be a service
      url: currentRoom.is(),
      name: '',
      message: vm.messageArea
    };
    vm.minimize = false;
    vm.messages = [];
    vm.users = [];

    vm.$onInit = function() {
      socket.emit('first-contact', {url: vm.user.url});
    }

    socket.on('message-list-and-name', function(data) {
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
