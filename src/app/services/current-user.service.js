import R from 'ramda';

module.exports = [
  'currentRoom', 'storage', 'appState',
  function(currentRoom, storage) {
  const service = this;
  let user = {}


  function initialize() {
    let localUser = storage.getCurrentUser();
    if (!localUser) {
      appState.loggedIn = false;
      user = {};
    } else {
      user = localUser;
      appState.loggedIn = true;
    }
  }

  return user;

}];
