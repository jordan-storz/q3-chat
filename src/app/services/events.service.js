import {Subject} from 'rxjs';

module.exports = ['socket', 'currentUser', 'storage', function(socket, currentUser, storage) {
  const service = this;
  const events_ = new Subject();

  service.emit = (name, data) => {
    return events_.next({name, data});
  }

  service.on = (eventName, cb) => {
    console.log('sending event');
    return events_
      .filter(event => event.name === eventName)
      .map(event => event.data)
      .subscribe(cb);
  }

}];
