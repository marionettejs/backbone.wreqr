# Backbone.Wreqr

Backbone.Wreqr is a library to help you write decoupled applications.

## Introduction

Backbone comes with a simple pub/sub system called Events. Backbone.Wreqr is a library that expands upon this with
two other systems: a request response system and a commands system.

The Event Aggregator is used to share events between your applications. Request response is used to provide a loosely-coupled
means for pieces of your application to share information between one another. And finally, commands is a way for pieces
of your application to tell other pieces to perform actions.

On the surface these patterns will appear similar. This is no surprise; they are each merely a semantic cover on top of the
Backbone.Events object. But this semantic difference can provide added clarity to your code, and robustness to your application
when used appropriately.

## Getting Started

Get the source by direct download, by cloning this repository, or through Bower.

`bower install backbone.wreqr`

## Event Aggregator

The Event Aggregator is a class for the Backbone.Events object that you may already be
familiar with. Use it as you would any other object that extends from Backbone.Events.

```js
var vent = new Backbone.Wreqr.EventAggregator();

vent.on("foo", function(){
  console.log("foo event");
});

vent.trigger("foo");
```

The Event Aggregator is best used to communicate events between your apps.

## Request Response

Request response is used to share information between pieces of your application. It works
in an opposite manner to the event aggregator. Whereas the event aggregator typically sends
information from the object that emits the event to the listeners, data in request response is
sent from the listener to the emitter, or requester. This allows you to send information upon
request.

```js
var reqres = new Backbone.Wreqr.RequestResponse();

reqres.setHandler("foo", function(){
  return "foo requested. this is the response";
});

var result = reqres.request("foo");
console.log(result);
```

## Commands

The final piece of Wreqr is commands. Unlike the event aggregator and request/response, which
each transfer data, commands is not meant to communicate data in any direction. Instead, it is merely
meant to request that work be done in a decoupled manner.

```js
var commands = new Backbone.Wreqr.Commands();

commands.setHandler("foo", function(){
  console.log("the foo command was executed");
});

commands.execute("foo");
```

### Adding Multiple Handlers

Multiple handlers can be set on the Commands and RequestResponse
objects in a single call, using the `setHandlers` method and supplying
a `{"name": configuration}` hash where the `configuration` is an
object literal or a function.

```js
var reqres = new Backbone.Wreqr.RequestResponse();

reqres.setHandlers({
  "foo": function(){ /* ... */ },
  "bar": {
    callback: function(){ /* ... */ },
    context: someObject
  }
});

var result = reqres.request("foo");
```

The "foo" handler is assigned directly to a function, while the
"bar" handler is assigned to a function with a specific context
to execute the function within.

This works for all `Handlers`, `Commands` and `RequestResponse`
objects.

### Removing Handlers

Removing handlers for commands or requests is done the
same way, with the `removeHandler` or `removeAllHandlers`
functions.

```js
reqres.removeHandler("foo");

commands.removeAllHandlers();
```

### Extending Wreqr Objects

The EventAggregator, Commands and RequestResponse objects can all be
extended using Backbone's standard `extend` method.

```js
var MyEventAgg = Backbone.Wreqr.EventAggregator.extend({
  foo: function(){...}
});

var MyCommands = Backbone.Wreqr.Commands.extend({
  foo: function(){...}
});

var MyReqRes = Backbone.Wreqr.RequestResponse.extend({
  foo: function(){...}
});
```

## License

MIT - see [LICENSE.md](https://raw.github.com/marionettejs/backbone.wreqr/master/LICENSE.md)

## Dev
* `npm install`
* `npm install -g grunt-cli`
* `grunt`

