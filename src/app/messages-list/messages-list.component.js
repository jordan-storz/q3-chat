import template from './messages-list.template.html';

const controller = ['socket', '$scope', 'currentUser', function(socket, $scope, currentUser) {
  const vm = this;

  vm.$onInit = function() {
    vm.currentUser = currentUser.get();
    socket.on(`${vm.currentUser.room}-new-message`, function(data) {
      let message = {
        user: {
          username: data.name
        },
        content: data.message
      }
      vm.messages.push(message);
      $scope.$apply();
    })
  }

  // socket.on(`${vm.currentUser.room}-new-message`, function(data) {
  //   vm.messages.push(data);
  //   $scope.$apply();
  // });

}]

module.exports = {
  template,
  controller,
  bindings: {
    messages: "=",
    isOnCall: '='
  }
}
