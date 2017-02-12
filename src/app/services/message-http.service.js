module.exports = ['$http', 'currentRoom', function($http, currentRoom) {
  const service = this;
  const apiPoint = 'localhost:4200/api/messages';

  const makeUrl = function() {
    currentRoom.get().then(room => {
      service.currentRoom = room
      return `${apiPoint}?roomName=${roomName}`;
    });
  }

  service.getMessages = function() {
    sevice.makeUrl().then($http.get);
  }
}];
