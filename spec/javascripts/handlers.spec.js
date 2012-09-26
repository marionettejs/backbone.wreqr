describe("handlers", function(){

  describe("when requesting a handler by name", function(){

    describe("and a handler has been registered with that name", function(){
      var handler, registeredHandler, ctx;

      beforeEach(function(){
        var handlers = new Wreqr.Handlers();

        ctx = {};
        registeredHandler = jasmine.createSpy("a registered handler");
        handlers.register("handler", registeredHandler, ctx);

        handler = handlers.getHandler("handler");
      });

      it("should return the registered handler callback", function(){
        expect(handler.callback).toBe(registeredHandler);
      });

      it("should return the registered handler context", function(){
        expect(handler.context).toBe(ctx);
      });

    });

    describe("and a handler has not been registered with that name", function(){
      var handlers;

      beforeEach(function(){
        handlers = new Wreqr.Handlers();
      });

      it("should return the registered handler", function(){
        function getHandler(){ handlers.getHandler("not registered");}
        expect(getHandler).toThrow("Handler not found for 'not registered'");
      });

    });

  });

});
