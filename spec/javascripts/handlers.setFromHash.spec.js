describe("handler - set from hash", function(){

  var HandlersClass, handlers;

  beforeEach(function(){
    HandlersClass = function(){
      this._handlersHandlers = {};
      this.type = 'Handler';
      this.eventContainer = 'handlersEvents';
      this.handlersEvents = _.extend({}, Backbone.Events);

      this.setHandlers = _.bind(Wreqr.Handlers.setHandlers, this, 'Handler');
      this.setHandler  = _.bind(Wreqr.Handlers.setHandler, this, 'Handler');
      this.hasHandler  = _.bind(Wreqr.Handlers.hasHandler, this, 'Handler');
      this.getHandler  = _.bind(Wreqr.Handlers.getHandler, this, 'Handler');
      this.removeHandler  = _.bind(Wreqr.Handlers.removeHandler, this, 'Handler');
      this.removeAllHandlers = _.bind(Wreqr.Handlers.removeAllHandlers, this, 'Handler');
    };
    HandlersClass.extend = Backbone.Model.extend;
    _.extend( HandlersClass.prototype, Wreqr.Handlers );

    handlers = new HandlersClass();
  });

  describe("when adding multiple handlers via an object literal / hash", function(){
    var hndlrs;

    beforeEach(function(){
      hndlrs = {
        "foo": jasmine.createSpy("foo handler"),
        "bar": jasmine.createSpy("bar handler")
      };

      handlers.setHandlers(hndlrs);
    });

    it("should add all named handlers", function(){
      expect(handlers.hasHandler("foo")).toBe(true);
      expect(handlers.hasHandler("bar")).toBe(true);
    });

    it("should execute the handler", function(){
      handlers.getHandler("foo")();
      handlers.getHandler("bar")();

      expect(hndlrs.foo).toHaveBeenCalled();
      expect(hndlrs.bar).toHaveBeenCalled();
    });
  });

  describe("when the object literal values are objects with a callback and context attribute", function(){
    var hndlrs, ctx;

    beforeEach(function(){
      ctx = {};
      
      hndlrs = {
        "foo": {
          callback: jasmine.createSpy("foo handler"),
          context: ctx
        }
      };
      handlers.setHandlers(hndlrs);

      handlers.getHandler("foo")();
    });

    it("should execute the handler callback with the specified context", function(){
      expect(hndlrs.foo.callback).toHaveBeenCalled();
      expect(hndlrs.foo.callback.mostRecentCall.object).toBe(ctx);
    });
  });

});
