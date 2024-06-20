import { VariableListener } from './modules/VariableListener.js';

// Usage example:
let listener1 = new VariableListener('test');

// Not subscribed yet, will not trigger any callback.
listener1.value = 111;

// We can attach logic here on a subscription.
// The logic can be remove by unsubscribing.
const callback1 = (response) => {
  console.log(`callback1: `, response);
};
const callback2 = (response) => {
  console.log(`callback1: `, response);
};
// Start listening:
listener1.subscribe(callback1);
listener1.subscribe(callback2);

// CB is invoked each time the listener.value is assigned a value:
listener1.value = 123;
listener1.value = 456;

// Remove the callback
listener1.unsubscribe(callback1);
listener1.value = 1001;

// Amount of times a value got emitted vs amount of times a change notified a subscriber
console.log(listener1.emitterCount);
console.log(listener1.totalSubscriberNotifications);
