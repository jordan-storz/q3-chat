import template from './messages-list.template.html';

const controller = function(socket, $scope) {
  const vm = this;

  vm.$onInit = function() {
    socket.on(`${vm.currentUser.room}-new-message`, function(data) {
      vm.messages.push(data);
      $scope.$apply();
    })
  }




}

module.exports = {
  template,
  controller,
  bindings: {
    messages: "=",
    currentUser: '=',
    isOnCall: '='
  }
}
