module.exports = ['$http', 'currentRoom', function($http, currentRoom) {
  const service = this;
  const endpoint = 'https://mj-data.herokuapp.com/api';

  service.getRoom = function () {
    let roomName = currentRoom.is();
    let path = `/rooms/${roomName}`;
    return $http.get(endpoint + path)
  }
}];
