import template from './single-message.template.html';

const controller = [function () {
  const vm = this;

  vm.$onInit = function () {
    vm.showOptions = false;
  }

  vm.toggleOptions = function () {
    vm.showOptions = !vm.showOptions;
  }
}]


module.exports = {
  template,
  controller,
  bindings: {
    message: "="
  }
}
