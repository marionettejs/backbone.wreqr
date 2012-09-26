describe("commands", function(){

  describe("when executing a command", function(){
    var commands, result;

    beforeEach(function(){
      commands = new Wreqr.Commands();

      commands.addHandler("do:it", function(){
        return "some value";
      });

      result = commands.execute("do:it");
    });

    it("should not return any value", function(){
      expect(result).toBeUndefined();
    });
  });

  describe("when executing a command with a parameter", function(){
    var commands, result, param;

    beforeEach(function(){
      commands = new Wreqr.Commands();

      commands.addHandler("do:it", function(p){
        param = p;
      });

      result = commands.execute("do:it", "foo");
    });

    it("should pass the param along", function(){
      expect(param).toBe("foo");
    });
  });

});
