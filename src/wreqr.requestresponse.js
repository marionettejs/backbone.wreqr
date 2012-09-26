Wreqr.RequestResponse = (function(Wreqr){

  return Wreqr.Handlers.extend({
    request: function(name, args){
      return this.getHandler(name)(args);
    }
  });

})(Wreqr);

