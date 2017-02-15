module.exports = ['$http', 'currentRoom', function($http, currentRoom) {
  const service = this;
  const apiPoint = 'https://mj-data.herokuapp.com/api/messages';
  // const apiPoint = 'http://localhost:5200/api/messages';

  const makeUrl = function() {
    currentRoom.get().then(room => {
      service.currentRoom = room
      return `${apiPoint}?roomName=${roomName}`;
    });
  }

  service.getMessages = function() {
    sevice.makeUrl().then($http.get);
  }

  service.postMessage = function (body) {
    return $http.post(apiPoint, body);
  }
}];
