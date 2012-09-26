Wreqr.Commands = (function(Wreqr){

  return Wreqr.Handlers.extend({
    execute: function(name, args){
      this.getHandler(name)(args);
    }
  });

})(Wreqr);
