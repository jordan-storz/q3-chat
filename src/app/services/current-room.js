module.exports = ['$location', function($window) {
  const service = this;
  const roomUrl = $location.url();

  service.is = function() {
    return roomUrl;
  }
}];
