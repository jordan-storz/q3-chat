import template from './video-display.template.html';

const controller = function(socket) {
  const vm = this;
  vm.hasCall = false;

  vm.hangUp = function() {
    console.log('hanging up');
    //Do the simplepeer.js stuff needed to disconnect
    vm.madeCall = false;
  }



}

module.exports = {
  template,
  controller,
  bindings: {
    madeCall: '='
  }
}
