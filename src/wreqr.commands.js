// Wreqr.Commands
// --------------
//
// A simple command pattern implementation. Register a command
// handler and execute it.
Wreqr.Commands = (function(Wreqr){
  "option strict";

  return Wreqr.Handlers.extend({
    execute: function(name, args){
      this.getHandler(name)(args);
    }
  });

})(Wreqr);
