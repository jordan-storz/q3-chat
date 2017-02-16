import {Subject} from 'rxjs';

module.exports = ['socket', 'currentUser', 'storage', function(socket, currentUser, storage) {
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

  service.initializeId = (id) => {
    socket.on(`${id}-block-me`, function(data) {
      currentUser.blockUsers.push(data.blocker_id);
      storage.setCurrentUser(currentUser);
      emit('new-user-block', data);
    });
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
      emit('initialize-id', data);
      socket.on(`${data.id}-incoming-call`, function(obj) {
        emit('incoming-call', obj);
      });
    });

    socket.on(`${room}-user-typing`, function(user) {
      emit(`${user.id}-user-typing`, user.id);
    })

    socket.on(`${room}-user-done-typing`, function(data) {
      emit(`${data.userId}-user-done-typing`, data.userId);
    })

  }
}];
