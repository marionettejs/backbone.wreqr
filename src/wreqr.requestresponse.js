// Wreqr.RequestResponse
// ---------------------
//
// A simple request/response implementation. Register a
// request handler, and return a response from it
Wreqr.RequestResponse = (function(Wreqr){
  "use strict";

  var RequestResponse = function(options) {
    this.options = options;
    this._wreqrHandlers = {};
    this.eventContainer = 'reqresEvents';
    this.reqresEvents = _.extend({}, Backbone.Events);
    this.type = 'Request';
  };

  RequestResponse.extend = Backbone.Model.extend;

  return RequestResponse.extend({

    setRequests: Wreqr.Handlers.setHandlers,
    setRequest : Wreqr.Handlers.setHandler,
    hasRequest : Wreqr.Handlers.hasHandler,
    getRequest : Wreqr.Handlers.getHandler,
    removeRequest : Wreqr.Handlers.removeHandler,
    removeAllRequests: Wreqr.Handlers.removeAllHandlers,

    request: function(){
      var name = arguments[0];
      var args = Array.prototype.slice.call(arguments, 1);

      return this.getRequest(name).apply(this, args);
    }
  });

})(Wreqr);
