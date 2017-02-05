import template from './message-input.template.html';

const controller = function(socket) {
    const vm = this
    vm.user = {};

    vm.$onInit = function() {

    }

    vm.sendMessage = function() {
        //we will need a global user object with (url, name, messge) //
        let data = {
            name: 'Mike',
            message: vm.messageArea,
            url: 'testURL'
        }
        socket.socket.emit('send-message', data)

    }

}

module.exports = {
    template,
    controller
}
