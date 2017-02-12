module.exports = ['currentRoom', function(currentRoom) {
  const service = this;
  currentRoom.get().then(room => service.currentRoom = room);

  service.users = [
    {name: "bob", socketId: 'asfscfs23', room: service.room},
    {name: "person", socketId: 'asfscfs23', room: service.room},
    {name: "pegasus", socketId: 'asfscfs23', room: service.room}
  ];

}];
