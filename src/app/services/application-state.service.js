module.exports = [
  'storage', 'currentRoom', function storageService(storage, currentRoom) {
    const service = this;
    let applicationState = {
      room: '',
      isOnCall: false,
    }


    return function getSet(prop, val) {
      if (!!val) {
        applicationState[prop] = val;
        return applicationState[prop];
      } else {
        return applicationState[prop];
      }
    }
}];
