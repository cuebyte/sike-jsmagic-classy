'use strict';

function classy(properties) {
  var init = properties['initialize'] || function() {};
  delete properties['initialize'];

  var klass = function () {
    init.apply(this, arguments);
  }
  for (var key in properties) {
    klass.prototype[key] = properties[key];
  }
  return klass
}

function Class(child, parent) {
  child = classy(child)
  if (parent) {
    child.prototype.__proto__ = parent.prototype
    child.__super__ = parent
  } else {
    child.__super__ = Object
  }
  child.prototype.__stack = child
  child.prototype.super = function(methodName) {
    this.__stack = this.__stack.__super__
    return this.__stack.prototype[methodName].apply(this, [].slice.call(arguments, 1))
  }
  return child;
}

module.exports = Class
