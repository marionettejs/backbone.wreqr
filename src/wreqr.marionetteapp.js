(function(){
  "option strict";

  if (Backbone && Backbone.Marionette && Backbone.Marionette.Application){
    var commands = new Wreqr.Commands();
    var reqres = new Wreqr.RequestResponse();

    _.extend(Backbone.Marionette.Application.prototype, {
      commands: commands,
      execute: function(name, argObj){
        commands.execute(name, argObj);
      },

      requestResponse: reqres,
      request: function(name, argObj){
        return reqres.request(name, argObj);
      }
    });
  }
})();
