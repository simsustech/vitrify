'use strict';

var typeHandlers = require('./types');
var detector = require('./detector');

/**
 * Return size information based on a buffer
 *
 * @param {Buffer} buffer
 * @returns {Object}
 */
function lookup (buffer) {
  // detect the file type.. don't rely on the extension
  var type = detector(buffer);

  // find an appropriate handler for this file type
  if (type in typeHandlers) {
    var size = typeHandlers[type].calculate(buffer);
    if (size !== false) {
      size.type = type;
      return size;
    }
  }

  // throw up, if we don't understand the file
  throw new TypeError('unsupported file type: ' + type);
}

/**
 * @param {Buffer|string} input - buffer or relative/absolute path of the image file
 */
module.exports = function (input) {

  // Handle buffer input
  if (Buffer.isBuffer(input)) {
    return lookup(input);
  }

  // input should be a buffer at this point
  throw new TypeError('expecting only a buffer as input');
};

module.exports.types = Object.keys(typeHandlers);
