module.exports = ['$http', function($http) {
  const service = this;
  const endpoint = 'http://localhost:5200/api/users';

  service.create = function (info) {
    return $http.post(endpoint, info);
  }
}];
