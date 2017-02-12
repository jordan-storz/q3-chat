import R from 'ramda';

module.exports = ['currentRoom', function(currentRoom) {
  const service = this;

  currentRoom.get().then(room => service.currentRoom = room);
  let user = {room: service.currentRoom};

  service.get = () => user;
  service.set = (propObj) => {
    R.keys(propObj).forEach(key => {
      user[key] = propObj[key];
    });
  }
}];
