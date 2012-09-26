describe("handlers", function(){

  describe("when requesting a handler by name", function(){

    describe("and a handler has been addHandlered with that name", function(){
      var handler, addHandleredHandler, ctx;

      beforeEach(function(){
        var handlers = new Wreqr.Handlers();

        ctx = {};
        addHandleredHandler = jasmine.createSpy("a addHandlered handler");
        handlers.addHandler("handler", addHandleredHandler, ctx);

        handler = handlers.getHandler("handler");
        handler();
      });

      it("should return the addHandlered handler callback", function(){
        expect(addHandleredHandler).toHaveBeenCalled();
      });

      it("should return the addHandlered handler context", function(){
        expect(addHandleredHandler.mostRecentCall.object).toBe(ctx);
      });

    });

    describe("and a handler has not been addHandlered with that name", function(){
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
    var handlers, addHandleredHandler, ctx;

    beforeEach(function(){
      handlers = new Wreqr.Handlers();

      ctx = {};
      addHandleredHandler = jasmine.createSpy("a addHandlered handler");
      handlers.addHandler("handler", addHandleredHandler, ctx);
      handlers.removeHandler("handler");
    });

    it("should no longer return the requested hander", function(){
      function getHandler(){ handlers.getHandler("handler");}

      expect(getHandler).toThrow("Handler not found for 'handler'");
    });
  });

  describe("when removing all handlers", function(){
    var handlers, addHandleredHandler, ctx;

    beforeEach(function(){
      handlers = new Wreqr.Handlers();

      ctx = {};
      addHandleredHandler = jasmine.createSpy("a addHandlered handler");
      handlers.addHandler("handler1", addHandleredHandler, ctx);
      handlers.addHandler("handler2", addHandleredHandler, ctx);

      handlers.removeAllHandlers();
    });

    it("should no longer return the requested handler", function(){
      function getHandler(){ handlers.getHandler("handler");}

      expect(getHandler).toThrow("Handler not found for 'handler'");
    });
  });

});
