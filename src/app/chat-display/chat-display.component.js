import $ from "jquery";
import template from './chat-display.template.html';


const controller = ['socket' ,function(socket) {
  console.log(socket);
  const vm = this;
  vm.messages = [];

  vm.$onInit = function() {
    socket.firstContact({url: "www.google.com"});
    socket.existingPosts().then(function(messages) {
      vm.messages = messages;
    });

  }

  vm.increaseOpacity = function() {
    let opac = parseFloat($('.chat-room-wrapper ').css('opacity')) + .1;
    if(opac >= 1) opac = 1;
    $('.chat-room-wrapper ').css('opacity', opac);
  }

  vm.decreaseOpacity = function() {
    let opac = parseFloat($('.chat-room-wrapper ').css('opacity')) - .1;
    if(opac <= .1) opac = .1;
    $('.chat-room-wrapper ').css('opacity', opac);
  }

}]

module.exports = {
  template,
  controller
}
