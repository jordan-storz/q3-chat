import template from './messages-list.template.html';

function controller(socket, $scope) {
  const vm = this;
  vm.myUrl = 'www.google.com';

  socket.on(`${vm.myUrl}-new-message`, function(data) {
    vm.messages.push(data);
    $scope.$apply();
  })

  socket.on(`${vm.myUrl}-disconnect`, function() {
    
  })

}

module.exports = {
  template,
  controller,
  bindings: {
    messages: "="
  }
}
