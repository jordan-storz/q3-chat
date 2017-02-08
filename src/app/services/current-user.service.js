import R from 'ramda';

module.exports = ['currentRoom', function(currentRoom) {
  const service = this;

  let user = {room: currentRoom.is()};

  service.get = () => user;
  service.set = (propObj) => {
    R.keys(propObj).forEach(key => {
      user[key] = propObj[key];
    });
  }
}];
