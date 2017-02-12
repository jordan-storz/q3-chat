module.exports = ['currentRoom', 'appState', function(currentRoom, appState) {
  const service = this;

  service.users = [
    {name: "bob", socketId: 'asfscfs23', room: appState.room},
    {name: "person", socketId: 'asfscfs23', room: appState.room},
    {name: "pegasus", socketId: 'asfscfs23', room: appState.room}
  ];

}];
