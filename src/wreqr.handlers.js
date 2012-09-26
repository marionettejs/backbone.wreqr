Wreqr.Handlers = (function(Backbone, _){
  "option strict";
  
  var Handlers = function(){
    "use strict";
    this._handlers = {};
  };

  Handlers.extend = Backbone.Model.extend;

  _.extend(Handlers.prototype, {
    addHandler: function(name, handler, context){
      var config = {
        callback: handler,
        context: context
      };

      this._handlers[name] = config;
    },

    getHandler: function(name){
      var config = this._handlers[name];

      if (!config){
        throw new Error("Handler not found for '" + name + "'");
      }

      return function(){
        return config.callback.apply(config.context, arguments);
      };
    },

    removeHandler: function(name){
      delete this._handlers[name];
    },

    removeAllHandlers: function(){
      this._handlers = {};
    }
  });

  return Handlers;
})(Backbone, _);
