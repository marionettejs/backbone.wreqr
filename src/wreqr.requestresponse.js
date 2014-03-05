// Wreqr.RequestResponse
// ---------------------
//
// A simple request/response implementation. Register a
// request handler, and return a response from it
Wreqr.RequestResponse = (function(Wreqr){
  "use strict";

  var RequestResponse = function(options) {
    this.options = options;
    this._requestsHandlers = {};
    this.eventContainer = 'reqresEvents';
    this.reqresEvents = _.extend({}, Backbone.Events);

    this.setRequests= _.bind(Wreqr.Handlers.setHandlers, this, 'Request');
    this.setRequest = _.bind(Wreqr.Handlers.setHandler, this, 'Request');
    this.hasRequest = _.bind(Wreqr.Handlers.hasHandler, this, 'Request');
    this.getRequest = _.bind(Wreqr.Handlers.getHandler, this, 'Request');
    this.removeRequest = _.bind(Wreqr.Handlers.removeHandler, this, 'Request');
    this.removeAllRequests= _.bind(Wreqr.Handlers.removeAllHandlers, this, 'Request');

  };

  RequestResponse.extend = Backbone.Model.extend;

  return RequestResponse.extend({

    request: function(){
      var name = arguments[0];
      var args = Array.prototype.slice.call(arguments, 1);

      return this.getRequest(name).apply(this, args);
    }
  });

})(Wreqr);
