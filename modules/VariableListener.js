export class VariableListener {
  // Our variable
  #_value = null;
  // Storage to hold each subscribers' callback (logic to execute on change if subscribed).
  #_subscribers = new Set();
  // Amount of times a value change will be emitted to every subscriber (1 for many subscribers).
  #_emitterCount = 0;
  // Total amount of times all subscribers got notified combined.
  #_totalSubscriberNotifications = 0;
  constructor(value) {
    this.#_value = value;
  }

  set value(val) {
    this.#_value = val;

    // Only emit a change if we have at least one subscriber listening for changes
    if (this.#_subscribers.size > 0) {
      this.#_emitChange();
    }
  }

  get value() {
    return this.#_value;
  }

  get emitterCount() {
    return this.#_emitterCount;
  }

  get totalSubscriberNotifications() {
    return this.#_totalSubscriberNotifications;
  }

  subscribe(callback) {
    if (callback instanceof Function) {
      if (this.#_subscribers.has(callback)) {
        console.error('The callback passed as argument is already in the subscribers Set');
        return;
      }
      this.#_subscribers.add(callback);
    } else {
      console.error('Argument must be a callback function');
      return;
    }
  }

  unsubscribe(callback) {
    // Find the callback function in the Set and delete it so it can't be invoked on the same subscriber.
    const callbackExists = this.#_subscribers.delete(callback);
    if (!callbackExists) {
      console.error('Attempted to delete entry that does not exist in the subscribers Set');
    }
  }

  #_emitChange() {
    this.#_subscribers.forEach((callback) => {
      // Keep track of amount of subscribers we are notifying:
      this.#_totalSubscriberNotifications += 1;
      // Invoke the callback with the value as argument.
      callback(this.#_value);
    });

    // Value change got emitted:
    this.#_emitterCount += 1;
  }
}
