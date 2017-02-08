import template from './users-list.template.html';
import R from 'ramda';

const controller = [
'socket', '$scope', 'currentRoom', 'roomUsers', 'currentUser',
function(socket, $scope, currentRoom, roomUsers, currentUser) {
  const vm = this;
  console.log('hello');
  vm.hideOptionsWithThisUser = true;

  vm.$onInit = function() {
    console.log('users-list line 17: currentUser');
    console.log(vm.currentUser);
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

    socket.on(`${vm.currentUser.socketId}-request-chat-request`, function(data) {
      console.log('recieving video chat request');
      vm.currentUser.initiator = false;
      vm.isOnCall = true;
      $scope.$apply();
    });
  }

  socket.on('user-list', function(data) {
    vm.users = data.users
    $scope.$apply();
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

  vm.blockUser = function(user) {
    console.log(`blocking: ${user.name}`);
    console.log(user);
  }

  vm.startVidChat = function(user) {
    console.log('Start video chat', user);
    vm.isOnCall = true;
    vm.currentUser.initiator = true;
    console.log(vm.currentUser);
    let obj = {
      fromId: vm.currentUser.socketId,
      toId: user.socketId,
      fromkey: 'key'
    }
    socket.emit('request-video-chat', obj);
  }

  //******** Video Requester functions **************




  //*********** video Requestee functions ***********



}]

module.exports = {
  template,
  controller,
  bindings: {
    isOnCall: '='
  }
}
