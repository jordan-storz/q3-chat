console.log('loading background');
console.log($);
console.log(io);
console.log(SimplePeer);
chrome.extension.onConnect.addListener(port => {
  console.log('connected!!');
  port.onMessage.addListener(msg => {
    console.log('received message from popup script');
    console.log(msg);
  });
});


(function() {
  const socketEndpoint = "";
    
}());
