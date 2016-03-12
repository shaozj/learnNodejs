
trigger: function(eventName) {
  var list, calls, ev, callback, args;
  var both = 2;
  if(!(calls = this.callbacks)) return this;
  while(both--) {
    ev = both ? eventName : 'all';
    if(list = calls[ev]) {
      for()
    }
  }
} 