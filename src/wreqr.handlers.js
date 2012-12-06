// Handlers
// --------
// A registry of functions to call, given a name

Wreqr.Handlers = (function(Backbone, _){
  "option strict";
  
  // Constructor
  // -----------

  var Handlers = function(){
    "use strict";
    this._handlers = {};
  };

  Handlers.extend = Backbone.Model.extend;

  // Instance Members
  // ----------------

  _.extend(Handlers.prototype, {

    // Add a handler for the given name, with an
    // optional context to run the handler within
    addHandler: function(name, handler, context){
      var config = {
        callback: handler,
        context: context
      };

      this._handlers[name] = config;
    },

    // Get the currently registered handler for
    // the specified name. Throws an exception if
    // no handler is found.
    getHandler: function(name){
      var config = this._handlers[name];

      if (!config){
        throw new Error("Handler not found for '" + name + "'");
      }

      return function(){
        var args = Array.prototype.slice.apply(arguments);
        return config.callback.apply(config.context, args);
      };
    },

    // Remove a handler for the specified name
    removeHandler: function(name){
      delete this._handlers[name];
    },

    // Remove all handlers from this registry
    removeAllHandlers: function(){
      this._handlers = {};
    }
  });

  return Handlers;
})(Backbone, _);
