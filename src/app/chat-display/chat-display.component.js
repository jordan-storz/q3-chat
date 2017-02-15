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

    vm.$onInit = function() {
      vm.currentUser = currentUser;
      roomHttp.getRoom().then(response => {
        let room = response.data.room;
        let messages = response.data.messages;
        console.log('****currentUser.block*****');
        console.log(currentUser.blockUsers);
        vm.messages = messages.filter(message => {
          return !R.contains(message.user.id, currentUser.blockUsers);
        });
        vm.room = room;
      })
    }

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
