var FakeAsync = {
  auto:  function(obj, callback) {
    callback();
  }
};

module.exports = FakeAsync;
