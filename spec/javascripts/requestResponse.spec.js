describe("request/response", function(){

  describe("when requesting a response", function(){
    var reqres, result;

    beforeEach(function(){
      reqres = new Wreqr.RequestResponse();

      reqres.addHandler("do:it", function(){
        return "some value";
      });

      result = reqres.request("do:it");
    });

    it("should return a value", function(){
      expect(result).toBe("some value");
    });
  });

  describe("when requesting a response, with a parameter", function(){
    var reqres, result, param;

    beforeEach(function(){
      reqres = new Wreqr.RequestResponse();

      reqres.addHandler("do:it", function(p){
        param = p;
      });

      result = reqres.request("do:it", "foo");
    });

    it("should pass the param along", function(){
      expect(param).toBe("foo");
    });
  });

});

