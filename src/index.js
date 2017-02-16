import $ from 'jquery';
import 'angular';
import 'socket.io-client';
import 'angularjs-scroll-glue';
import './app.scss';
import './app/app.module.js';

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  let tab = tabs[0];
  var port = chrome.tabs.connect(tab.id, {name: 'chatApp'});
  console.log('PORT');
  console.log(port);
  setTimeout(() => {
    port.postMessage({message: 'message here for you'})
  }, 6000);
  port.postMessage.addListener = (msg) => {
    console.log('added listener');
  };
});
