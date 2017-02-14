import template from './main.template.html';
import R from 'ramda';

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
          userHttp.fetch()
            .then(response => {
              console.log(response);
              let user = response.data.user;
              socketListeners.initializeId(user.id);
              let currentBlocks = currentUser.blockUsers;
              let newBlocks = response.data.blockUsers.filter(userId => {
                return !R.contains(userId, currentBlocks);
              });
              currentUser.blockUsers = currentBlocks.concat(newBlocks);
              storage.setCurrentUser(currentUser);
              console.log(currentUser);
            });
        } else {
          userHttp.create(currentUser)
            .then(response => {
              let user = response.data;
              socketListeners.initializeId(user.id);
              for(let key in user){
                currentUser[key] = user[key];
              }
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
