import template from './message-input.template.html';

const controller = function(socket) {
    const vm = this;

    vm.sendMessage = function() {
      if(vm.messageArea !== '') {
        let data = {
            name: 'Mike',
            message: vm.messageArea,
            url: 'www.google.com'
        }
        socket.emit('send-message', data);
        vm.messageArea = '';
      }
    }

}

module.exports = {
    template,
    controller
}
