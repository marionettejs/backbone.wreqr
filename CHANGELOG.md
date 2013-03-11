# Change log

### v0.2.0

* Updated build process to use Grunt v0.4

* Commands
  * Introduced Wreqr.CommandStorage to store commands for later execution
  * When a command has no handler, it will be stored for later execution
  * When a handler for a stored command is added, the stored command will be
    executed

* Handlers (Commands/RequestResponse)
  * Allow an `initialize` function when extending from the base type

### v0.1.1

* Fixed "option strict" to be "use strict" ... #facepalm :P
* Added jam package config

### v0.1.0

* Fix calls to `.apply` to account for IE < 9 throwing an error when `arguments` is null or undefined

### v0.0.1

* Commands
  * Can specify multiple arguments for `execute` method

* RequestResponse
  * Can speicfy multiple arguments for `request` method

### v0.0.0

* Initial release
