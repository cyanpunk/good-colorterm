'use strict';

var Colorterm = require('colorterm');
var Moment = require('moment');
var Hoek = require('hoek');
var Through = require('through2');

var console = new Colorterm();

var internals = {};


module.exports = internals.GoodColorterm = function (events, config) {

  if (!(this instanceof internals.GoodColorterm)) {
    return new GoodColorterm(events, config);
  }

};

internals.GoodColorterm.prototype.init = function (stream, server, callback) {

  var self = this;

  if (!stream._readableState.objectMode) {
    return callback(new Error('stream must be in object mode'));
  }

  stream.pipe(Through.obj(self._transform));

  callback();

};

internals.GoodColorterm.prototype._transform = function (object, encoding, next) {

  // Should implement these functions in colorterm;
  // log [string]
  // debug [object]
  // error [string]
  // error [object,stack]
  // response [ob]
  // warn [string]
  // info [string]


  // switch(object.event) {
    // case 'log':
    //   if (typeof object.data === 'object') {
    //     // console.dir(object.data);
    //   }
    //   else {
    //     console.log(object);
    //     console.log(object);
    //     // console.debug(object.data);
    //   }
    //   break;
    // case 'error':
    //   // console.error(object.error.message);
    //   break;
    // default:
      // console.dir(object);
  // }

  if (console[object.event]) {
    console[object.event].apply(console, arguments);
  }

  return next();

}
