// Wreqr.RequestResponse
// ---------------------
//
// A simple request/response implementation. Register a
// request handler, and return a response from it
Wreqr.RequestResponse = (function(Wreqr){
  "use strict";

  return Wreqr.Handlers.extend({
    request: function(name){
      if (this.hasHandler(name)) {
        return this._triggerHandler.apply(this, arguments);
      }
    }
  });

})(Wreqr);
