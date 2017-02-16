import R from 'ramda';

module.exports = [function () {
  const service = this;

  service.initialize = function () {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      let tab = tabs[0];
      service.port = chrome.tabs.connect(tab.id, {name: 'chatApp'});
    });
  }

  service.sendMessage = (message) => {
    console.log('sending message');
    if (service.port) {
      console.log('sending message to content script');
      service.port.postMessage(message);
    }
  }


}]
