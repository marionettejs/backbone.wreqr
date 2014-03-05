// Handlers
// --------
// A registry of functions to call, given a name

Wreqr.Handlers = (function(Backbone, _){
  "use strict";

  var Handlers = {

    // Add multiple handlers using an object literal configuration
    setHandlers: function(handlers){
      var handlerName = 'set'+this.type;
      _.each(handlers, function(handler, name){
        var context = null;

        if (_.isObject(handler) && !_.isFunction(handler)){
          context = handler.context;
          handler = handler.callback;
        }

        this[handlerName](name, handler, context);
      }, this);
    },

    // Add a handler for the given name, with an
    // optional context to run the handler within
    setHandler: function(name, handler, context){
      
      var config = {
        callback: handler,
        context: context
      };

      this._wreqrHandlers[name] = config;

      this[this.eventContainer].trigger("handler:add", name, handler, context);
    },

    // Determine whether or not a handler is registered
    hasHandler: function(name){
      return !! this._wreqrHandlers[name];
    },

    // Get the currently registered handler for
    // the specified name. Throws an exception if
    // no handler is found.
    getHandler: function(name){
      var config = this._wreqrHandlers[name];

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
      delete this._wreqrHandlers[name];
    },

    // Remove all handlers from this registry
    removeAllHandlers: function(){
      this._wreqrHandlers = {};
    },

    // Get the name of the property that holds the events container
    _configureHandlerType: function( type ) {
      this.eventContainer = t
      return type + 'Events';
    }
  };

  return Handlers;
})(Backbone, _);
