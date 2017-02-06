module.exports = ['$location', function($location) {
  const service = this;
  const roomUrl = $location.absUrl();
  const roomName = roomUrl.replace(/http.*\/\//, '').replace(/\//g, '$');

  service.is = function() {
    return roomName;
  }
}];
