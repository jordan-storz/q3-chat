import template from './users-list.template.html';
import R from 'ramda';

const controller = [
'socket', '$scope', 'currentRoom', 'currentUser', 'appState',
'socketListeners', 'userHttp','storage',
function(socket, $scope, currentRoom, currentUser, appState, socketListeners, userHttp, storage) {
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
    vm.showOldName = true;

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
      let isBlocked = R.contains(user.id, currentUser.blockUsers);

      let findUser = R.head(R.project(['id'], vm.users));
      console.log(findUser);
      if (findUser) {
        findUser.username = user.username;
        $scope.$apply();
      } else {
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
    vm.toggleShow();
    vm.newName = '';
    $('#show-old-name').focus();
  }

  vm.newNameSubmit = function() {
    if(vm.newName.trim() !== '') {
      let info = {
        username: vm.newName
      }
      userHttp.update(info).then(function(response) {
        console.log(response.data);
        for(let key in response.data) {
          currentUser[key] = response.data[key];
        }
        storage.setCurrentUser(currentUser);
        socket.emit('im-here', currentUser);
      });
    }
    vm.toggleShow();
  }

  vm.toggleShow = function() {
    vm.showOldName = !vm.showOldName;
  }

}]

module.exports = {
  template,
  controller,
  bindings: {
    isOnCall: '='
  }
}
