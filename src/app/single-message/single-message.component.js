import template from './single-message.template.html';

const controller = ['events', function (events) {
  const vm = this;

  vm.$onInit = function () {
    vm.showOptions = false;
    listen(vm.message.user.username);
  }

  function listen (username) {
    events.on(`${username}-name-change`, username => {
      vm.message.user.username = username;
      listen(username);
    });
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
