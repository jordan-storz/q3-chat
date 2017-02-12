import R from 'ramda';

module.exports = ['$location', function($location) {
  const exists = R.compose(R.not, R.isNil);
  const service = this;
  const serializeUrl = (url) => {
    return url.replace(/http.*\/\//, '').replace(/\//g, '$');
  }
  let roomUrl;

  service.get = function () {
    return new Promise((resolve, reject) => {
      let r = resolve;
      if (exists(roomUrl)) {
        r(roomUrl);
      } else if (exists(chrome.tabs)) {
        r(getChromeTabUrl());
      } else if (exists($location.absUrl)){
        r($location.absUrl());
      } else {
        reject('Could not find room name / url.');
      }
    })
    .then(url => {
      roomUrl = serializeUrl(url);
      return roomUrl;
    });
  }

  function getChromeTabUrl () {
    return new Promise((resolve, reject) => {
      let queryInfo = {
        active: true,
        currentWindow: true
      };
      chrome.tabs.query(queryInfo, tabs => {
        let url = tabs[0].url;
        return url ? resolve(url) : reject('Error in loading chrome tabs.');
      });
    });
  }


}];
