import template from './main.template.html';

const controller = ['currentUser', function(currentUser) {
  const vm = this;

  vm.$onInit = function () {
    console.log('init app');
    currentUser.init();
  }
}];


module.exports = {
  template,
  controller
}
