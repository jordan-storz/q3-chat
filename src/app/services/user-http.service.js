module.exports = ['$http', 'currentUser', function($http, currentUser) {
  const service = this;
  // const endpoint = 'http://localhost:5200/api/users';
  const endpoint = 'https://mj-data.herokuapp.com/api/users';
  service.create = function (info) {
    return $http.post(endpoint, info);
  }

  service.update = function(info) {
    let patchEndpoint = endpoint + '/' + currentUser.id;
    return $http.patch(patchEndpoint, info);
  }

  service.createBlock = function(body) {
    const endpoint = 'https://mj-data.herokuapp.com/api/block_users';
    // const endpoint = 'http://localhost:5200/api/block_users';
    return $http.post(endpoint, body);
  }

  service.fetch = function() {
    let id = currentUser.id;
    let url = endpoint + '/' + id;
    return $http.get(url);
  }
}];
