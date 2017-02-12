module.exports = [
  'storage', 'currentRoom', function storageService(storage, currentRoom) {
    const service = this;
    let defaultState = {
      room: '',
      isOnCall: true,
    }

    return defaultState;
}];
