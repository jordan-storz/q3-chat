$('document').ready(function() {

  makeLayout();
  $(window).resize(makeLayout);

  function makeLayout() {
    
    let interfaceWidth = $('div.interface').css('width');
    $('div.message-list-container').css('width', interfaceWidth);

    if(window.location.href.substring(0, 10) !== 'chrome-ext') {
      $('body').css('min-height', '300px');

      let windowHeight = $(window).height();
      $('body').css('height', (.8 * windowHeight) + 'px');

      let bodyHeight = parseInt($('body').css('height'));
      let inputHeight = parseInt($('message-input').css('height'));
      let headerHeight = parseInt($('header').css('height'));

      [bodyHeight, inputHeight, headerHeight].forEach(x => console.log(x))

      let messageListHeight = (bodyHeight - inputHeight - headerHeight) + 'px';

      console.log(messageListHeight);
      $('.message-list-container').css('max-height', messageListHeight);
    }
  }
});
