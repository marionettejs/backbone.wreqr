// Wreqr.Commands
// --------------
//
// A simple command pattern implementation. Register a command
// handler and execute it.
Wreqr.Commands = (function(Wreqr){
  "option strict";

  return Wreqr.Handlers.extend({
    execute: function(){
      var name = arguments[0];
      var args = Array.prototype.slice.call(arguments, 1);

      this.getHandler(name).apply(this, args);
    }
  });

})(Wreqr);
