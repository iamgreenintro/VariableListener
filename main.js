import { VariableListener } from './modules/VariableListener.js';

// Usage example:
let listener1 = new VariableListener('test');

// Overwrites the value we passed into the constructor:
listener1.value = 111; // why is this not logged?
// Overwrites the previous value:
listener1.value = 222;

// We can attach logic here on a subscription.
// The logic can be remove by unsubscribing.
const callback = (response) => {
  console.log(`-=-=-=-=-=-`);
  console.log(response);
};

const callback2 = (response) => {
  console.log(`@@@@@@@`);
  console.log(response);
};

// Start listening:
listener1.subscribe(callback);
listener1.subscribe(callback2);

// CB is invoked each time the listener.value is assigned a value:
listener1.value = 456;
listener1.value = 789;

// Remove the callback

listener1.unsubscribe(callback);
listener1.value = 1000;
listener1.value = 1001;
// listener1.unsubscribe(callback2);

console.log(listener1.emitterCount);
console.log(listener1.totalSubscriberNotifications);
