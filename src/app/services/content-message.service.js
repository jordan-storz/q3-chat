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
    if (service.port) {
      service.port.postMessage(message);
    }
  }


}]
