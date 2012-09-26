Wreqr.Handlers = function(){
  "use strict";
  this._handlers = {};
};

_.extend(Wreqr.Handlers.prototype, {
  register: function(name, handler, context){
    var config = {
      callback: handler,
      context: context
    };

    this._handlers[name] = config;
  },

  getHandler: function(name, args){
    var config = this._handlers[name];

    if (!config){
      throw new Error("Handler not found for '" + name + "'");
    }

    return config;
  },

  removeHandler: function(name){
    delete this._handlers[name];
  },

  clearHandlers: function(){
    this._handlers = {};
  }
});
