$('document').ready(function() {

  makeLayout();
  $(window).resize(makeLayout);

  function makeLayout() {
    let interfaceWidth = $('div.interface').css('width');
    $('div.message-list-container').css('width', interfaceWidth);
    let bodyHeight = parseInt($('body').css('height'));
    let inputHeight = parseInt($('message-input').css('height'));
    let headerHeight = parseInt($('header').css('height'));
    let messageListHeight = (bodyHeight - inputHeight - headerHeight - 2) + 'px';
    $('.message-list-container').css('max-height', messageListHeight);

    if(window.location.href.substring(0, 10) !== 'chrome-ext') {
      $('body').css('min-height', '300px');
      let windowHeight = $(window).height();
      $('body').css('height', (.9 * windowHeight) + 'px');
      bodyHeight = parseInt($('body').css('height'));
      inputHeight = parseInt($('message-input').css('height'));
      headerHeight = parseInt($('header').css('height'));
      messageListHeight = (bodyHeight - inputHeight - headerHeight - 2) + 'px';
      $('.message-list-container').css('max-height', messageListHeight);
    }
  }

});
