// Event Aggregator
// ----------------
// A pub-sub object that can be used to decouple various parts
// of an application through event-driven architecture.

Wreqr.EventAggregator = (function(Backbone, _){

  // Grab a reference to the original listenTo
  var listenTo = Backbone.Events.listenTo;

  // Create a version of listenTo that allows contexting binding
  function contextBoundListenTo(obj, evtSource, events, callback, context){
    context = context || obj;
    return listenTo.call(obj, evtSource, events, _.bind(callback, context));
  }

  // Define the EventAggregator
  function EventAggregator(){}

  // Mix Backbone.Events in to it
  _.extend(EventAggregator.prototype, Backbone.Events, {
    // Override the listenTo so that we can have a version that
    // correctly binds context
    listenTo: function(evtSource, events, callback, context){
      return contextBoundListenTo(this, evtSource, events, callback, context);
    }
  });

  // Allow it to be extended
  EventAggregator.extend = Backbone.Model.extend;

  return EventAggregator;
})(Backbone, _);
