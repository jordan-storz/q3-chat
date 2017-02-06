// Dependencies
import angular from 'angular';

// Components
import mainComponent          from './main/main.component.js';
import chatDisplayComponent   from './chat-display/chat-display.component.js';
import usersListComponent     from './users-list/users-list.component.js';
import videoDisplayComponent  from './video-display/video-display.component.js';
import messagesListComponent  from './messages-list/messages-list.component.js';
import singleMessageComponent from './single-message/single-message.component.js';
import messageInputComponent  from './message-input/message-input.component.js';

// Directives
import dragDropDirective      from './directives/drag-drop.directive.js';

//Services
import socketService          from './services/socket.service.js';
import currentRoomService            from './services/current-room.js';
import messageHttpService            from './services/message-http.js';

angular.module('chatApp', [])
  .component('mainComponent', mainComponent)
  .component('chatDisplay', chatDisplayComponent)
  .component('usersDisplay', usersListComponent)
  .component('videoDisplay', videoDisplayComponent)
  .component('messagesList', messagesListComponent)
  .component('singleMessage', singleMessageComponent)
  .component('messageInput', messageInputComponent)
  .directive('dragDrop', dragDropDirective)
  .service('socket', socketService)
  .service('currentRoom', currentRoomService)
  .service('messageHttp', messageHttpService)



// single-message
// single-user


// CHAT-DISPLAY
// USERS-DISPLAY
// VIDEO-DISPLAY
