module.exports = ['$http', 'currentRoom', function($http, currentRoom) {
  const service = this;
  const endpoint = 'https://mj-data.herokuapp.com/api';

  service.getRoom = function () {
    currentRoom.get()
      .then(room => {
        service.currentRoom = room
        return `/rooms/${room}`;
      })
      .then(path => endpoint + path)
      .then($http.get)
      .catch(console.error);
  }
}];
