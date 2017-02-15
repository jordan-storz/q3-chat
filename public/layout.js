$('document').ready(function() {

  makeLayout();
  $(window).resize(makeLayout);

  function makeLayout() {
    let interfaceWidth = $('div.interface').css('width');
    $('div.message-list-container').css('width', interfaceWidth);

    let bodyHeight = parseInt($('body').css('height'));
    let inputHeight = parseInt($('message-input').css('height'));
    let headerHeight = parseInt($('header').css('height'));

    [bodyHeight, inputHeight, headerHeight].forEach(x => console.log(x))

    let messageListHeight = (bodyHeight - inputHeight - headerHeight) + 'px';

    console.log(messageListHeight);
    $('.message-list-container').css('max-height', messageListHeight);
  }
});
