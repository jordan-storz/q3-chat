import template from './message-input.template.html';

const controller = function() {
    const vm = this

    vm.$onInit = function() {

    }

    vm.sendMessage = function() {
        //we will need a global user object with (url, name, messge)
        let message = $('.message-area').val(); //
        console.log(message);
        let data = {
            name: 'Mike',
            message: message,
            url: 'testURL'
        }
        socket.emit('send-message', data)

    }

}

module.exports = {
    template,
    controller
}
