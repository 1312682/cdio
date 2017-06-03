outcome = {};

outcome.getDataOfVersion = function(array, version) {
  for (var i = 0; i < array.length; i++) {
    var obj = array[i];
    if (obj.current.ver == version) {
      obj.query = obj.current;
    } else {
      for (var i = 0; i < obj.prev.length; i++) {
        if (obj.prev[i].ver == version) {
          obj.query = obj.prev[i];
        }
      }
    }
  }
}

module.exports = outcome;