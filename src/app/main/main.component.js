import template from './main.template.html';

const controller = [
  'currentRoom', 'currentUser', 'appState', 'socketListeners', '$location',
  'userHttp', 'socket', '$scope', 'storage',
  function(currentRoom, currentUser, appState, socketListeners, $location, userHttp, socket, $scope, storage) {
    const vm = this;

    vm.$onInit = function() {
      vm.thisUrl = $location.absUrl();
      vm.appState = appState;
      vm.currentUser = currentUser;
      currentRoom.get().then(room => {
        let storageUser = storage.getCurrentUser();
        if (storageUser) {
          for (let key in storageUser) {
            currentUser[key] = storageUser[key];
          }
          console.log('USER EXISTS');
        } else {
          userHttp.create(currentUser)
            .then(response => {
              let user = response.data;
              currentUser.username = user.username;
              storage.setCurrentUser(currentUser);
            })
            .catch(console.log);
        }
        let info = {
          room: room,
          user: currentUser
        }
        socket.emit('whos-here', info);
        appState.room = room;
        socketListeners.initialize(room);
        socketListeners.on('initialize-id', (data) => {
          currentUser.socketId = data.id;
        });
      });
    }
}];

module.exports = {
  template,
  controller
}
