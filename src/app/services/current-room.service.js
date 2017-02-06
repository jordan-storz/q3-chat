module.exports = ['$location', function($location) {
  const service = this;
  const roomUrl = $location.absUrl();

  service.is = function() {
    return roomUrl;
  }
}];
