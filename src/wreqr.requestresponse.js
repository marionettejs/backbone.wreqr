Wreqr.RequestResponse = (function(Wreqr){
  "option strict";

  return Wreqr.Handlers.extend({
    request: function(name, args){
      return this.getHandler(name)(args);
    }
  });

})(Wreqr);

