(function(Marionette){
  "use strict";

  var handlers = {};

  _.extend(Marionette.Application.prototype, {
    respondTo: function(name, handler, context){
      var config = {
        handler: handler,
        context: context
      };

      handlers[name] = config;
    },

    request: function(name, args){
      var config = handlers[name];

      if (!config){
        throw new Error("Request handler not found for '" + name + "'");
      }

      return config.handler.call(config.context, args);
    },

    removeRequestHandler: function(name){
      delete handlers[name];
    },

    clearRequestHandlers: function(){
      handlers = {};
    }
  });

})(Backbone.Marionette);

// Command Pattern
// ---------------

(function(Marionette){
  "use strict";

  var handlers = {};

  _.extend(Marionette.Application.prototype, {

    registerCommand: function(name, handler, context){
      handlers[name] = {
        handler: handler,
        context: context
      };
    },

    removeCommand: function(name){
      delete handlers[name];
    },

    clearCommands: function(){
      handlers = {};
    },

    execute: function(name, args){
      var config = handlers[name];
      if (!config){
        throw new Error("Handler not found for '" + name + "'");
      }

      config.handler.call(config.context, args);
    }
  });

})(Backbone.Marionette);
