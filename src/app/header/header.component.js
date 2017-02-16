import $ from "jquery";
import template from './header.template.html';
import R from 'ramda';

const controller = ['socket', 'currentUser', 'appState', 'storage', 'userHttp',
  function(socket, currentUser, appState, storage, userHttp) {
  const vm = this;
  vm.showOldName = true;

  vm.$onInit = function () {
    vm.currentUser = currentUser;
  }

  vm.changeName = function() {
    vm.toggleShow();
    vm.newName = '';
    $('input#show-old-name').focus();
  }

  vm.newNameSubmit = function() {
    if(vm.newName.trim() !== '') {
      let info = {
        username: vm.newName
      }
      userHttp.update(info).then(function(response) {
        for(let key in response.data) {
          currentUser[key] = response.data[key];
        }
        storage.setCurrentUser(currentUser);
          let currentUserInfo = R.assoc('room', appState.room, currentUser);
          socket.emit('im-here', currentUserInfo);
      });
    }
    vm.toggleShow();
  }

  vm.toggleShow = function() {
    vm.showOldName = !vm.showOldName;
  }

  vm.onInputKeypress = function (event) {
    if (event.keyCode === 13) {
      vm.newNameSubmit();
    }
  }
}];

module.exports = {
  template,
  controller
}
