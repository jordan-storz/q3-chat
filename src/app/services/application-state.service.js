module.exports = [
  'storage', 'currentRoom', function storageService(storage, currentRoom) {
    const service = this;
    let defaultState = {
      room: '',
      isOnCall: false,
      messages: []
    }

    return defaultState;
}];
