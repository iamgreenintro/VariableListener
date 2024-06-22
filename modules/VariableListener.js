// TODO:

export class VariableListener {
  // Our variable
  #_value = null;
  // Storage to hold each subscribers' callback (logic to execute on change if subscribed).
  #_subscribers = new Set();
  // Amount of times a value has changed.
  #_valueChangeCount = 0;
  // Combined amount of notifications sent to all subscribers.
  #_totalSubscriberNotifications = 0;
  // Keep track of individual timed listeners in case any unsubscribe we need to clear the interval and callback
  #_intervalInstances = new Set();

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

  get valueChangeCount() {
    return this.#_valueChangeCount;
  }

  get totalSubscriberNotifications() {
    return this.#_totalSubscriberNotifications;
  }

  //
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

      // Keep a reference to this class for scoping.
      const self = this;

      // Allow the subscriber to invoke the callback every x amount of ms.
      return {
        updateEvery(ms) {
          const intervalInstance = setInterval(() => {
            // Keep track of amount of subscribers we are notifying:
            self.#_totalSubscriberNotifications += 1;
            callback(self.#_value);
          }, ms);

          self.#_intervalInstances.add({
            interval: intervalInstance,
            callback: callback,
          });
        },
      };
    } catch (exception) {
      throw Error(exception);
    }
  }

  unsubscribe(callback) {
    // Clear interval reference that has been set for the specified callback:
    this.#_intervalRemover(callback);

    // Find and delete the callback or throw an error if it could not be found.
    const callbackExists = this.#_subscribers.delete(callback);
    if (!callbackExists) {
      // Does not necessarily break stuff, but to keep things clean we will throw an error.
      throw new Error('Attempted to delete an entry that does not exist in the subscribers set');
    }
  }

  #_emitChange() {
    this.#_subscribers.forEach((callback) => {
      // Only invoke the callback with the value as argument when it's not already getting called from an interval.
      if (!this.#_hasIntervalAttached(callback)) {
        // Keep track of amount of subscribers we are notifying:
        this.#_totalSubscriberNotifications += 1;
        callback(this.#_value);
      }
    });

    // Increase the amount of times we changed the value:
    this.#_valueChangeCount += 1;
  }

  #_intervalRemover(callbackFn) {
    for (const entry of this.#_intervalInstances) {
      if (entry.callback === callbackFn) {
        clearInterval(entry.interval);
        this.#_intervalInstances.delete(entry);
      }
    }
  }

  #_hasIntervalAttached(callbackFn) {
    for (const entry of this.#_intervalInstances) {
      if (entry.callback === callbackFn) {
        return true;
      }
    }
    return false;
  }
}
