describe("handlers", function(){

  describe("when adding a handler", function(){
    var handlers, handler, setHandleredHandler, ctx;

    beforeEach(function(){
      handlers = new Wreqr.Handlers();
      spyOn(handlers, "trigger");

      ctx = {};
      setHandleredHandler = jasmine.createSpy("a setHandlered handler");

      handlers.setHandler("foo", setHandleredHandler, ctx);

      handler = handlers.getHandler("foo");
      handler();
    });

    it("should trigger a handler:add event", function(){
      expect(handlers.trigger).toHaveBeenCalledWith("handler:add", "foo", setHandleredHandler, ctx);
    });
  });

  describe("when requesting a handler by name", function(){

    describe("and a handler has been setHandlered with that name", function(){
      var handler, setHandleredHandler, ctx;

      beforeEach(function(){
        var handlers = new Wreqr.Handlers();

        ctx = {};
        setHandleredHandler = jasmine.createSpy("a setHandlered handler");
        handlers.setHandler("handler", setHandleredHandler, ctx);

        handler = handlers.getHandler("handler");
        handler();
      });

      it("should return the setHandlered handler callback", function(){
        expect(setHandleredHandler).toHaveBeenCalled();
      });

      it("should return the setHandlered handler context", function(){
        expect(setHandleredHandler.mostRecentCall.object).toBe(ctx);
      });

    });

    describe("and a handler has not been setHandlered with that name", function(){
      var handlers;

      beforeEach(function(){
        handlers = new Wreqr.Handlers();
      });

      it("should thrown an error saying a handler was not found", function(){
        function getHandler(){ handlers.getHandler("not registered");}

        expect(getHandler).toThrow("Handler not found for 'not registered'");
      });

    });

  });

  describe("when removing a named handler", function(){
    var handlers, setHandleredHandler, ctx;

    beforeEach(function(){
      handlers = new Wreqr.Handlers();

      ctx = {};
      setHandleredHandler = jasmine.createSpy("a setHandlered handler");
      handlers.setHandler("handler", setHandleredHandler, ctx);
      handlers.removeHandler("handler");
    });

    it("should no longer return the requested hander", function(){
      function getHandler(){ handlers.getHandler("handler");}

      expect(getHandler).toThrow("Handler not found for 'handler'");
    });
  });

  describe("when removing all handlers", function(){
    var handlers, setHandleredHandler, ctx;

    beforeEach(function(){
      handlers = new Wreqr.Handlers();

      ctx = {};
      setHandleredHandler = jasmine.createSpy("a setHandlered handler");
      handlers.setHandler("handler1", setHandleredHandler, ctx);
      handlers.setHandler("handler2", setHandleredHandler, ctx);

      handlers.removeAllHandlers();
    });

    it("should no longer return the requested handler", function(){
      function getHandler(){ handlers.getHandler("handler");}

      expect(getHandler).toThrow("Handler not found for 'handler'");
    });
  });

});
