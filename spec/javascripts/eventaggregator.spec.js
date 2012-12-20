describe("event aggregator", function(){
  
  describe("when triggering an event", function(){
    var vent, handlerCalled;
    
    beforeEach(function(){
      var vent = new Wreqr.EventAggregator();

      vent.on("foo", function(){
        handlerCalled = true;
      });

      vent.trigger("foo");
    });

    it("should fire handlers", function(){
      expect(handlerCalled).toBe(true);
    });
  });

  describe("when unbinding from an event and then triggering it", function(){
    var vent, handlerCalled;

    beforeEach(function(){
      var vent = new Wreqr.EventAggregator();

      var callback = function(){
        handlerCalled = true;
      };

      binding = vent.on("foo", callback);

      vent.off("foo", callback);

      vent.trigger("foo");
    });

    it("should not fire any handlers", function(){
      expect(handlerCalled).toBeUndefined();
    });
  });

  describe("event binder", function(){
    var model, obj;

    beforeEach(function(){
      model = new Backbone.Model();
      obj = new Backbone.Wreqr.EventAggregator();
    });

    describe("when binding an event with no context specified, then triggering that event", function(){
      var context, handler;

      beforeEach(function(){
        handler = jasmine.createSpy("context free handler");

        obj.listenTo(model, "foo", handler);

        model.trigger("foo");
      });

      it("should execute in the context of the object that has the event binder attached to it", function(){
        expect(handler.mostRecentCall.object).toBe(obj);
      });

      it("should execute", function(){
        expect(handler).toHaveBeenCalled();
      });

    });

    describe("when binding an event with a context specified, then triggering that event", function(){
      var context, handler;

      beforeEach(function(){
        handler = jasmine.createSpy("context bound handler");

        obj.listenTo(model, "foo", handler, model);

        model.trigger("foo");
      });

      it("should execute in the context of the object that has the event binder attached to it", function(){
        expect(handler.mostRecentCall.object).toBe(model);
      });

      it("should execute", function(){
        expect(handler).toHaveBeenCalled();
      });

    });

  });

});
