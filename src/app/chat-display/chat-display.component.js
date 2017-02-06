import $ from "jquery";
import template from './chat-display.template.html';

const controller = ['socket', '$scope',  function(socket, $scope) {
    const vm = this;
    vm.user = {};
    vm.minimize = false;
    vm.messages = [];

    vm.$onInit = function() {
      socket.emit('first-contact', {url: "www.google.com"});
    }


    socket.on('message-list-and-name', function(data) {
      //I really wanna set the name attribute on the user object here
      vm.messages = data.messageRay;
      $scope.$apply();
    });

    vm.minimizeBox = function() {
      vm.minimize = !vm.minimize;
    }

    //the below was a breaking change
    // socket.on('testURL', function(data) {
    //     console.log(data);
    //     vm.messages.push(data.message);
    //     console.log(vm.messages);
    // })

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
