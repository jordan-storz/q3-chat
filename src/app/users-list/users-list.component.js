import template from './users-list.template.html';
import R from 'ramda';

const controller = [
'socket', '$scope', 'currentRoom', 'roomUsers', 'currentUser',
function(socket, $scope, currentRoom, roomUsers, currentUser) {
  const vm = this;
  console.log('hello');


  vm.$onInit = function() {
    currentRoom.get().then(room => vm.currentRoom = room);
    vm.users = roomUsers.users;
    vm.currentUser = currentUser.get();
    socket.emit('new-user', vm.currentUser);

    socket.on(`${vm.currentUser.room}-echo-whos-here`, function(user) {
      // vm.users.push(user);
      console.log('responding to whos here');
      if (vm.currentUser.name) {
        socket.emit('im-here', vm.currentUser);
      }
    });

    socket.on(`${vm.currentUser.room}-add-user`, function(user) {
      console.log('add user:');
      console.log(user);
      let userNames = R.pluck('name', vm.users);
      let contains = R.contains(user.name, userNames);
      console.log(vm.users);
      if (!contains && (user.name !== vm.currentUser.name)) {
        console.log('pushing user');
        vm.users.push(user);
        console.log(R.pluck('name', vm.users));
        $scope.$apply();
      }
    });
  }

  socket.on('user-list', function(data) {
    vm.users = data.users
    $scope.$apply();
  })

  socket.on('user-exit', function(data) {
    console.log('USER EXITED');
    console.log(vm.users.length);
    vm.users = vm.users.filter(user => user.socketId !== data.socketId);
    console.log(vm.users.length);
    $scope.$apply();
  })



  vm.changeName = function() {
    console.log('changing name');
  }

}]

module.exports = {
  template,
  controller,
  bindings: {
    isOnCall: '='
  }
}
