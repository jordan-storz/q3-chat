import template from './users-list.template.html';
import R from 'ramda';

const controller = [
'socket', '$scope', 'currentRoom', 'roomUsers', 'currentUser', 'appState',
'socketListeners',
function(socket, $scope, currentRoom, roomUsers, currentUser, appState, socketListeners) {
  const vm = this;

  vm.$onInit = function() {
    vm.appState = appState;
    vm.users = roomUsers.users;
    vm.currentUser = currentUser;
    socket.emit('new-user', vm.currentUser);

    socketListeners.on('room-echo-whos-here', function(info) {
      if (info.user.username !== currentUser.username) {
        vm.users.push(info.user);
      }
      if (currentUser.username) {
        let info = R.assoc('room', appState.room, currentUser);
        socket.emit('im-here', info);
      }
      $scope.$apply();
    });


    socketListeners.on('room-add-user', function(user) {
      let userNames = R.pluck('username', vm.users);
      let contains = R.contains(user.username, userNames);
      if (!contains && (user.username !== vm.currentUser.username)) {
        vm.users.push(user);
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
