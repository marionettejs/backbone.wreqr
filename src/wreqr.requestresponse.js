// Wreqr.RequestResponse
// ---------------------
//
// A simple request/response implementation. Register a
// request handler, and return a response from it
Wreqr.RequestResponse = (function(Wreqr){
  "option strict";

  return Wreqr.Handlers.extend({
    request: function(name, args){
      return this.getHandler(name)(args);
    }
  });

})(Wreqr);
