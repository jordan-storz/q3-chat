module.exports = ['currentRoom', function(currentRoom) {
  const service = this;

  service.users = [
    {name: "bob", socketId: 'asfscfs23', room: currentRoom.is()},
    {name: "person", socketId: 'asfscfs23', room: currentRoom.is()},
    {name: "pegasus", socketId: 'asfscfs23', room: currentRoom.is()}
  ];

}];
