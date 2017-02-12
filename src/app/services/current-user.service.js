import R from 'ramda';

module.exports = ['currentRoom', 'storage', function(currentRoom, storage) {
  const service = this;
  let user;

  service.get = () => {
    return user || storage.getCurrentUser();
  };

  service.set = (propObj) => {
    R.keys(propObj).forEach(key => {
      user[key] = propObj[key];
    });
    storage.setCurrentUser(user);
  }

}];
