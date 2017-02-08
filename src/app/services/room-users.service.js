module.exports = ['currentRoom', function(currentRoom) {
  const service = this;

  service.users = [
    {name: "bob", socketId: 'asfscfs23', room: currentRoom.is()}
  ];

}];
