# Backbone.Wreqr

A simple message bus for Backbone and Backbone.Marionette

## Downloads And Source

Grab the source from the `src` folder above. Grab the most recent builds
from the links below.

### Standard Builds

* Development: [backbone.wreqr.js](https://raw.github.com/marionettejs/backbone.wreqr/master/lib/backbone.wreqr.js)

* Production: [backbone.wreqr.min.js](https://raw.github.com/marionettejs/backbone.wreqr/master/lib/backbone.wreqr.min.js)

### RequireJS (AMD) Builds

* Development: [backbone.wreqr.js](https://raw.github.com/marionettejs/backbone.wreqr/master/lib/amd/backbone.wreqr.js)

* Production: [backbone.wreqr.min.js](https://raw.github.com/marionettejs/backbone.wreqr/master/lib/amd/backbone.wreqr.min.js)

## Basic Use

Wreqr can be used by instantiating a `Backbone.Wreqr.Commands`
or `Backbone.Wreqr.RequestResponse` object. These objects provide an
`addHandler` method to add a handler for a named request or command.
Commands can then be executed with the `execute` method, and 
request/response can be done through the `request` method.

### Commands

```js
var commands = new Backbone.Wreqr.Commands();

commands.addHandler("foo", function(){
  console.log("the foo command was executed");
});

commands.execute("foo");
```

### Request/Response

```js
var reqres = new Backbone.Wreqr.RequestResponse();

reqres.addHandler("foo", function(){
  return "foo requested. this is the response";
});

var result = reqres.request("foo");
console.log(result);
```

### Removing Handlers

Removing handlers for commands or requests is done the
same way, with the `removeHandler` or `removeAllHandlers`
functions.

```js
reqres.removeHandler("foo");

commands.removeAllHandlers();
```

## License

MIT - see [LICENSE.md](https://raw.github.com/marionettejs/backbone.wreqr/master/LICENSE.md)
