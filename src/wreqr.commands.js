// Wreqr.Commands
// --------------
//
// A simple command pattern implementation. Register a command
// handler and execute it.
Wreqr.Commands = (function(Wreqr){
  "use strict";

  var Commands = function(options) {
      this.options = options || {};
      this._wreqrHandlers = {};
      this._initializeStorage(this.options);

      this.type = 'Command';
      this.eventContainer = 'commandsEvents';
      this.commandsEvents = _.extend({}, Backbone.Events);

      this[this.eventContainer].on("handler:add", this._executeCommands, this);
  };

  Commands.extend = Backbone.Model.extend;

  return Commands.extend({

    setCommands: Wreqr.Handlers.setHandlers,
    setCommand : Wreqr.Handlers.setHandler,
    hasCommand : Wreqr.Handlers.hasHandler,
    getCommand : Wreqr.Handlers.getHandler,
    removeCommand : Wreqr.Handlers.removeHandler,
    removeAllCommands: Wreqr.Handlers.removeAllHandlers,

    storageType: Wreqr.CommandStorage,

    // Execute a named command with the supplied args
    execute: function(name, args){
      name = arguments[0];
      args = Array.prototype.slice.call(arguments, 1);

      if (this.hasCommand(name)){
        this.getCommand(name).apply(this, args);
      } else {
        this.storage.addCommand(name, args);
      }

    },

    // Internal method to handle bulk execution of stored commands
    _executeCommands: function(name, handler, context){
      var command = this.storage.getCommands(name);

      // loop through and execute all the stored command instances
      _.each(command.instances, function(args){
        handler.apply(context, args);
      });

      this.storage.clearCommands(name);
    },

    // Internal method to initialize storage either from the type's
    // `storageType` or the instance `options.storageType`.
    _initializeStorage: function(options){
      var storage;

      var StorageType = options.storageType || this.storageType;
      if (_.isFunction(StorageType)){
        storage = new StorageType();
      } else {
        storage = StorageType;
      }

      this.storage = storage;
    }

  });

})(Wreqr);
