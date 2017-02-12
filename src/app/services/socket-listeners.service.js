import {Subject} from 'rxjs';

module.exports = ['socket', 'currentUser', function(socket, currentUser) {
  const service = this;
  const events_ = new Subject();

  service.on = (eventName, cb) => {
    return events_
      .filter(event => event.name === eventName)
      .map(event => event.data)
      .subscribe(cb);
  }

  const emit = (name, data) => {
    return events_.next({name, data});
  }

  service.initialize = (room) => {
    socket.on(`${room}-add-user`, function(user) {
      emit(`room-add-user`, user);
    });

    socket.on('user-list', function(data) {
      emit('user-list', data);
    });

    socket.on('user-exit', function(data) {
      emit('user-exit', data);
    });

    socket.on(`${room}-new-message`, function(data) {
      emit('room-new-message', data);
    });

    socket.on(`${room}-echo-whos-here`, function(info) {
      emit('room-echo-whos-here', info);
    });

    socket.on('initialize-id', function(data) {
      console.log("INIT ID:");
      console.log(data);
      emit('initialize-id', data);
      socket.on(`${data.id}-incoming-call`, function(obj) {
        console.log('incomingcall');
        emit('incoming-call', obj);
      });
      socket.on(`${data.socketId}-accepted-call`, function(obj) {
        emit('accepted-call', obj);
        console.log("THEY ACCEPTED YOUR CALL!!!!");
      });
    });

  }
}];
