module.exports = function() {
  const service = this;

  service.socket = io.connect('http://127.0.0.1:3000');

}
