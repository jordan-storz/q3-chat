import template from './message-input.template.html';

const controller = ['$scope', 'currentUser', 'socket', function($scope, currentUser, socket) {
    const vm = this;

    vm.$onInit = function() {
      vm.currentUser = currentUser.get();
      console.log(vm.currentUser);
    }

    vm.sendMessage = function() {
      if(vm.messageArea !== '') {
        vm.currentUser.message = vm.messageArea;
        socket.emit('send-message', vm.currentUser);
        vm.messageArea = '';
      }
    }

}]

module.exports = {
    template,
    controller,
    bindings: {
      isOnCall: '='
    }
}
