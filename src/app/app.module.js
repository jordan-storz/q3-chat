// Dependencies
import angular from 'angular';

// Components
import mainComponent          from './main/main.component.js';
import chatDisplayComponent   from './chat-display/chat-display.component.js';
import usersListComponent     from './users-list/users-list.component.js';
import singleUserComponent    from './single-user/single-user.component.js';
import videoDisplayComponent  from './video-display/video-display.component.js';
import messagesListComponent  from './messages-list/messages-list.component.js';
import singleMessageComponent from './single-message/single-message.component.js';
import messageInputComponent  from './message-input/message-input.component.js';
import logInComponent         from './log-in/log-in.component.js';

// Directives
import dragDropDirective      from './directives/drag-drop.directive.js';

//Services
import socketService          from './services/socket.service.js';
import currentRoomService     from './services/current-room.service.js';
import messageHttpService     from './services/message-http.service.js';
import userHttpService        from './services/user-http.service.js';
import roomHttpService        from './services/room-http.service.js';
import roomUsersService       from './services/room-users.service.js';
import currentUserService     from './services/current-user.service.js';
import videoChatService       from './services/video-chat.service.js';
import storageService         from './services/storage.service.js';
import applicationStateService  from './services/application-state.service.js';
import socketListenersService   from './services/socket-listeners.service.js';

angular.module('chatApp', [])
  .component('mainComponent', mainComponent)
  .component('chatDisplay', chatDisplayComponent)
  .component('usersDisplay', usersListComponent)
  .component('singleUser', singleUserComponent)
  .component('videoDisplay', videoDisplayComponent)
  .component('messagesList', messagesListComponent)
  .component('singleMessage', singleMessageComponent)
  .component('messageInput', messageInputComponent)
  .component('logIn', logInComponent)
  .directive('dragDrop', dragDropDirective)
  .service('socket', socketService)
  .service('currentRoom', currentRoomService)
  .service('messageHttp', messageHttpService)
  .service('userHttp', userHttpService)
  .service('roomHttp', roomHttpService)
  .service('roomUsers', roomUsersService)
  .service('currentUser', currentUserService)
  .service('videoChat', videoChatService)
  .service('storage', storageService)
  .service('appState', applicationStateService)
  .service('socketListeners', socketListenersService)
