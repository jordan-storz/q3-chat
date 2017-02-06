module.exports = ['$http', 'currentRoom', function($http, currentRoom) {
  const service = this;
  const apiPoint = 'localhost:4200/api/messages';

  const makeUrl = function() {
    let roomName = currentRoom.is();
    return `${apiPoint}?roomName=${roomName}`
  }

  service.getMessages = function() {
    return $http.get(makeUrl());
  }
}];
