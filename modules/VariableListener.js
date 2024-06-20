export class VariableListener {
  #_value = null;
  #_emitterCount = 0; // Amount of times a value change will be emitted to every subscriber (1 for many subscribers).
  #_subscribers = new Set(); // Storage for our subscribers' callback.
  #_totalSubscriberNotifications = 0;

  constructor(value) {
    this.#_value = value;
  }

  set value(val) {
    this.#_value = val;

    // Only emit a change if we have at least one subscriber for the value change
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
    // Only invoke callback the next time
    if (this.#_subscribers.has(callback)) {
      callback(this.#_value);
    }
    this.#_subscribers.add(callback);
  }

  unsubscribe(callback) {
    // Find the callback function in the Set and delete it so it can't be invoked on the same subscriber.
    const callbackExists = this.#_subscribers.delete(callback);
    if (!callbackExists) {
      console.error('Attempted to delete a callback that does not exist');
    }
  }

  #_emitChange() {
    this.#_subscribers.forEach((callback) => {
      this.#_totalSubscriberNotifications += 1;
      return callback(this.#_value);
    });
    this.#_emitterCount += 1;
  }
}
