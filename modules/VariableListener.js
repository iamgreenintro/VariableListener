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
    try {
      // Must be a Function type.
      if (!(callback instanceof Function)) {
        throw new TypeError('Argument must be a function');
      }
      // Can not be an anonymous function (when unsubscribing, we need the callback reference).
      if (!callback.name) {
        throw new TypeError('Argument can not be an anonymous funtion.');
      }
      // Can not already exist.
      if (this.#_subscribers.has(callback)) {
        throw new Error('The function is already attached to a subscriber.');
      }

      this.#_subscribers.add(callback);
    } catch (exception) {
      throw Error(exception);
    }
  }

  unsubscribe(callback) {
    // Find and delete the callback or throw an error if it could not be found.
    const callbackExists = this.#_subscribers.delete(callback);
    if (!callbackExists) {
      // Does not necessarily break stuff, but to keep things clean we will throw an error.
      throw new Error('Attempted to delete entry that does not exist in the subscribers set');
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
