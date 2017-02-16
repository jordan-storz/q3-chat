console.log('loading background');
chrome.extension.onConnect.addListener(port => {

  console.log('connected!!');
  port.onMessage.addListener(msg => {
    console.log('received message from popup script');
    document.querySelector('body').innerText = "hey!!!"
  });
});

console.log(chrome.extension.onConnect);
