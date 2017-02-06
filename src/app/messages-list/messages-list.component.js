import template from './messages-list.template.html';

function controller(socket, $scope) {
  const vm = this;
  vm.myUrl = 'www.google.com';

  console.log(vm.messages);

  // vm.messages = [{name: "bob", message: "Bob is awesome"},{name: "Joe", message: "Joe is awesomer"}];

  socket.on('www.google.com', function(data) {
    console.log('13 data.message: ', data.message);
    vm.messages.push(data);
    console.log('14 the messages are', vm.messages);
    $scope.$apply(); //I think MAYBE I need one of these
  })

}

module.exports = {
  template,
  controller,
  bindings: {
    messages: "="
  }
}
