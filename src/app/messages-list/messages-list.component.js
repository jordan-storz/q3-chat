import template from './messages-list.template.html';

function controller() {
  const vm = this;

  //vm.messages = [{name: "bob", message: "Bob is awesome"},{name: "Joe", message: "Joe is awesomer"}];

}

module.exports = {
  template,
  controller,
  bindings: {
    messages: "="
  }
}
