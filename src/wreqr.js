(function(root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['exports', 'backbone', 'underscore'], function(exports, Backbone, _) {
      factory(exports, Backbone, _);
    });
  } else if (typeof exports !== 'undefined') {
    var Backbone = require('backbone');
    var _ = require('underscore');
    factory(exports, Backbone, _);
  } else {
    factory({}, root.Backbone, root._);
  }

}(this, function(Wreqr, Backbone, _) {
  "use strict";

  Backbone.Wreqr = Wreqr;

  // @include wreqr.handlers.js
  // @include wreqr.commandStorage.js
  // @include wreqr.commands.js
  // @include wreqr.requestresponse.js
  // @include wreqr.eventaggregator.js
  // @include wreqr.channel.js
  // @include wreqr.radio.js

}));
