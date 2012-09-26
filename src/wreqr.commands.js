Wreqr.Commands = (function(Wreqr){
  "option strict";

  return Wreqr.Handlers.extend({
    execute: function(name, args){
      this.getHandler(name)(args);
    }
  });

})(Wreqr);
