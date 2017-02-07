import template from './users-list.template.html';

const controller = function(socket, $scope, currentRoom) {
  //at this point, if currentUsers URL and name are not set, they need to
  //be set or these actions may need to happen somewhere else
  const vm = this;
  vm.users = [{name: "bob", socketId: 'asfscfs23', room: currentRoom.is()}];
  vm.hideOptionsWithThisUser = true;

  vm.madeCall = false;
  vm.currentUser = {
      name: "mike",
      socketId: 'asfscfs2f3',
      room: currentRoom.is()
  };

  vm.$onInit = function() {
    vm.url = currentRoom.is();
    socket.emit('get-users', vm.currentUser);
    // This is a request to sockets to gather the info of every one with currentUsers url
    socket.emit('new-user', vm.currentUser);  //lets everyone else know that this user has joined
  }

  socket.on('user-list', function(data) {
  // This function expects a list of names with their socket ids
    vm.users = data.users
    $scope.$apply();
  })

  socket.on(`${vm.url}-add-new-user`, function(user) {
    //This expects an object with atleast a name and a socket id element
    if(user.socketId !== vm.currentUser.socketId) {
      vm.users.push(user);
      $scope.$apply();
    }
  })

  socket.on('disconnect-event', function() {
    //go through user list and remove the id that left
    //This is probable NOT the best way to do it
    //Discuss before implementing cuz  dont wanna waste my time
  })

  vm.displayOptionsWithThisUser = function() {
    vm.hideOptionsWithThisUser = !vm.hideOptionsWithThisUser;
    console.log(vm.hideOptionsWithThisUser);
  }

  vm.changeName = function() {
    console.log('changing name');
  }

  vm.blockUser = function() {
    console.log(`blocking user`);
  }

  vm.startVidChat = function() {
    console.log('Start video chat');
    vm.madeCall = true;
  }

}

module.exports = {
  template,
  controller
}
