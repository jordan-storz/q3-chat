import template from './message-input.template.html';

const controller = function(socket) {
    const vm = this;

    vm.$onInit = function() {
      console.log(vm.currentUser);
    }

    vm.sendMessage = function() {
      if(vm.messageArea !== '') {
        vm.currentUser.message = vm.messageArea;
        socket.emit('send-message', vm.currentUser);
        vm.messageArea = '';
      }
    }

}

module.exports = {
    template,
    controller,
    bindings: {
      currentUser: '=',
      isOnCall: '='
    }
}
