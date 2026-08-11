'use strict';

var typeHandlers = require('./types');

module.exports = function (buffer) {
  var type, result;
  for (type in typeHandlers) {
    result = typeHandlers[type].detect(buffer);
    if (result) {
      return type;
    }
  }
};
