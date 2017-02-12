import template from './users-list.template.html';
import R from 'ramda';

const controller = [
'socket', '$scope', 'currentRoom', 'roomUsers', 'currentUser', 'appState',
'socketListeners',
function(socket, $scope, currentRoom, roomUsers, currentUser, appState, socketListeners) {
  const vm = this;

  vm.$onInit = function() {
    console.log('ON INIT');
    vm.appState = appState;
    vm.users = roomUsers.users;
    vm.currentUser = currentUser;
    socket.emit('new-user', vm.currentUser);
    socketListeners.on('room-echo-whos-here', function(info) {
      vm.users.push(info.user);
      console.log('responding to whos here');
      console.log(info);
      console.log(vm.users);
      if (currentUser.username) {
        socket.emit('im-here', currentUser);
      }
      $scope.$apply();
    });


    socketListeners.on('room-add-user', function(user) {
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


  socketListeners.on('user-list', function(data) {
    vm.users = data.users
    $scope.$apply();
  });

  socket.on('user-exit', function(data) {
    vm.users = vm.users.filter(user => user.socketId !== data.socketId);
    $scope.$apply();
  });

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
