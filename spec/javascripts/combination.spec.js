describe("when merging all three systems on a single object", function(){

  var commands, reqres, vent, obj, ventSpy, commandsSpy, reqresSpy;

  beforeEach(function(){
    commands = new Wreqr.Commands();
    reqres = new Wreqr.RequestResponse();
    vent = new Wreqr.EventAggregator();

    obj = {};

    _.extend( obj, commands, reqres, vent );

    ventSpy = jasmine.createSpy("vent spy");
    commandsSpy = jasmine.createSpy("commands spy");
    reqresSpy = jasmine.createSpy("reqres spy");

  });

  describe("and executing a command", function() {

    beforeEach(function() {
      obj.on( 'hello', ventSpy );
      obj.setCommand( 'hello', commandsSpy );
      obj.setRequest( 'hello', reqresSpy );

      obj.execute( 'hello' );
    });

    it("should only fire the command", function(){
      expect(ventSpy).not.toHaveBeenCalled();
      expect(reqresSpy).not.toHaveBeenCalled();
      expect(commandsSpy).toHaveBeenCalled();
    });

  });

  describe("and triggering an event", function() {

    beforeEach(function() {
      obj.on( 'hello', ventSpy );
      obj.setCommand( 'hello', commandsSpy );
      obj.setRequest( 'hello', reqresSpy );

      obj.trigger( 'hello' );
    });

    it("should only fire the command", function(){
      expect(ventSpy).toHaveBeenCalled();
      expect(reqresSpy).not.toHaveBeenCalled();
      expect(commandsSpy).not.toHaveBeenCalled();
    });

  });

  describe("and making a request", function() {

    beforeEach(function() {
      obj.on( 'hello', ventSpy );
      obj.setCommand( 'hello', commandsSpy );
      obj.setRequest( 'hello', reqresSpy );

      obj.request( 'hello' );
    });

    it("should only fire the command", function(){
      expect(ventSpy).not.toHaveBeenCalled();
      expect(reqresSpy).toHaveBeenCalled();
      expect(commandsSpy).not.toHaveBeenCalled();
    });

  });
  
});
