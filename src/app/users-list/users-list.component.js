import template from './users-list.template.html';

const controller = function(socket, $scope) {
  //at this point, if currentUsers URL and name are not set, they need to
  //be set or these actions may need to happen somewhere else

  const vm = this;
  vm.users = [{name: "bob", socketId: 'asfscfs23'}];
  vm.hideOptionsWithThisUser = true;
  vm.currentUser = {name: "mike", socketId: 'asfscfs23'};

  vm.$onInit = function() { //This needs to happen every time the users url changes. Is onInit the proper place for that?
    console.log('this is an init');
    socket.emit('get-users', vm.currentUser);
    // This is a request to sockets to gather the address of every one with currentUsers url and send back an array of them

    socket.emit(`new-user`, vm.currentUser);  //lets everyone else know that this user has joined
  }

  socket.on(`${vm.currentUser.url}-add-new-user`, function(user) {
    //This expects an object with atleast a name and a socket id element
    vm.users.push(user);
    $scope.$apply();
  })

  vm.displayOptionsWithThisUser = function() {
    console.log('hello');
    vm.hideOptionsWithThisUser = !vm.hideOptionsWithThisUser;
    console.log(vm.hideOptionsWithThisUser);
  }

  vm.changeName = function() {
    console.log('changing name');
  }

}

module.exports = {
  template,
  controller
}
