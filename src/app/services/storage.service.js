module.exports = function storageService() {
  const service = this;
  const localStorage = window.localStorage;

  service.getCurrentUser = () => {
    let result = localStorage.getItem('current-user');
    return JSON.parse(result);
  }

  service.setCurrentUser = (user) => {
    let result = JSON.stringify(user);
    localStorage.setItem('current-user', result);
    return true;
  }
}
