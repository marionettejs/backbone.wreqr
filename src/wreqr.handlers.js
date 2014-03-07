// Handlers
// --------
// A registry of functions to call, given a name

Wreqr.Handlers = (function(Backbone, _){
  "use strict";

  var Handlers = {

    // Add multiple handlers using an object literal configuration
    setHandlers: function(type, handlers){
      type = type || 'Handler';
      var handlerName = 'set'+type;
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
    setHandler: function(type, name, handler, context){

      type = type || 'Handler';
      var handlerContainer = '_'+type.toLowerCase()+'sHandlers';

      var config = {
        callback: handler,
        context: context
      };

      this[handlerContainer][name] = config;

      this[this.eventContainer].trigger("handler:add", name, handler, context);
    },

    // Determine whether or not a handler is registered
    hasHandler: function(type, name){
      type = type || 'Handler';
      var handlerContainer = '_'+type.toLowerCase()+'sHandlers';
      return !! this[handlerContainer][name];
    },

    // Get the currently registered handler for
    // the specified name. Throws an exception if
    // no handler is found.
    getHandler: function(type, name){
      type = type || 'Handler';
      var handlerContainer = '_'+type.toLowerCase()+'sHandlers';
      var config = this[handlerContainer][name];

      if (!config){
        throw new Error("Handler not found for '" + name + "'");
      }

      return function(){
        var args = Array.prototype.slice.apply(arguments);
        return config.callback.apply(config.context, args);
      };
    },

    // Remove a handler for the specified name
    removeHandler: function(type, name){
      type = type || 'Handler';
      var handlerContainer = '_'+type.toLowerCase()+'sHandlers';
      delete this[handlerContainer][name];
    },

    // Remove all handlers from this registry
    removeAllHandlers: function(type){
      type = type || 'Handler';
      var handlerContainer = '_'+type.toLowerCase()+'sHandlers';
      this[handlerContainer] = {};
    },

    // Alias these handler methods and attach them to object
    _extendHandlerMethods: function(object, alias) {

      var Alias = alias.charAt(0).toUpperCase() + alias.slice(1);

      this[ 'set'+Alias+'s' ] = _.bind(Wreqr.Handlers.setHandlers, this, Alias);
      this[ 'set'+Alias ]  = _.bind(Wreqr.Handlers.setHandler, this, 'Command');

      this.eventContainer = 'commandsEvents';


      this.commandsEvents = _.extend({}, Backbone.Events);

      this.setCommand  = _.bind(Wreqr.Handlers.setHandler, this, 'Command');
      this.hasCommand  = _.bind(Wreqr.Handlers.hasHandler, this, 'Command');
      this.getCommand  = _.bind(Wreqr.Handlers.getHandler, this, 'Command');
      this.removeCommand  = _.bind(Wreqr.Handlers.removeHandler, this, 'Command');
      this.removeAllCommands = _.bind(Wreqr.Handlers.removeAllHandlers, this, 'Command');

    }   

  };

  return Handlers;
})(Backbone, _);
