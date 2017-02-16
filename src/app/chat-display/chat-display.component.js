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
        vm.messages = messages.filter(message => {
          return !R.contains(message.user.id, currentUser.blockUsers);
        });
        vm.room = room;
        $scope.$apply();
      })
    }

    vm.minimizeBox = function() {
      vm.minimize = !vm.minimize;
    }

}]

module.exports = {
    template,
    controller,
    bindings: {
      isOnCall: '='
    }
}
