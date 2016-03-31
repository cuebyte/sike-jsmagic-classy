'use strict';

module.exports = function (properties) {
  var initialize = properties['initialize'] ? properties['initialize'] : function () {};
  delete properties['initialize'];
  return function () {
    for (var method in properties) {
      this[method] = properties[method];
    }
    initialize.apply(this, arguments);
  };
};
