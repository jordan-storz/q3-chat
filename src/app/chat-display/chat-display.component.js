import $ from "jquery";
import template from './chat-display.template.html';

function controller() {
  const vm = this;

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

}

module.exports = {
  template,
  controller
}
