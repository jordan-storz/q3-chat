import $ from 'jquery';
import 'angular';
import 'socket.io-client';
import './app.scss';
import './app/app.module.js';


const $application =
  $(`
    <div ng-app="chatApp">
      <main-component></main-component>
    </div>
    `);
$application.css({
  zIndex: 1000,
})
$('body').prepend($application);
