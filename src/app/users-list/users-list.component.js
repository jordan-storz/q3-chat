import template from './users-list.template.html';
import R from 'ramda';

const controller = [
'socket', '$scope', 'currentRoom', 'currentUser', 'appState',
'socketListeners', 'userHttp','storage', 'events',
function(socket, $scope, currentRoom, currentUser, appState, socketListeners, userHttp, storage, events) {
  const vm = this;

  vm.$onInit = function() {
    socketListeners.on('new-user-block', event => {
      console.log(vm.users);
    })
    vm.appState = appState;
    vm.users = [];
    vm.currentUser = currentUser;
    vm.newUser = currentUser;
    socket.emit('new-user', vm.currentUser);

    socketListeners.on('room-echo-whos-here', function(info) {
      if (!R.contains(info.user.id, currentUser.blockUsers)) {
        if (info.user.username !== currentUser.username) {
          vm.users.push(info.user);
        }
        if (currentUser.username) {
          let currentUserInfo = R.assoc('room', appState.room, currentUser);
          socket.emit('im-here', currentUserInfo);
        }
        $scope.$apply();
      }
    });

    socketListeners.on('room-add-user', function(user) {
      if (user.id === currentUser.id) {
        return;
      }
      let isBlocked = R.contains(user.id, currentUser.blockUsers);
      if(!isBlocked) {
        let existingUser = vm.users.filter(roomUser => {
          return roomUser.id === user.id;
        })[0];
        if (existingUser) {
          events.emit(`${existingUser.username}-name-change`, user.username);
          existingUser.username = user.username;
        } else {
          vm.users.push(user);
        }
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

}]

module.exports = {
  template,
  controller,
  bindings: {
    isOnCall: '='
  }
}
