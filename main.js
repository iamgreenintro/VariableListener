import { VariableListener } from './modules/VariableListener.js';

let keepTrackOfThis = 0;

// Create a new VariableListener instance with a default null value (or optionally instantiate it with a value):
let myListener = new VariableListener(keepTrackOfThis);
console.log(myListener.value);

const callback1 = (response) => {
  console.log('callback \t[1]: ', response);
};

const callback2 = (response) => {
  console.log('callback \t\t[2]: ', response);
};

const callback3 = (response) => {
  console.log('callback \t\t\t[3]: ', response);
};

myListener.subscribe(callback1).updateEvery(1000);
myListener.subscribe(callback2).updateEvery(2000);
myListener.subscribe(callback3);

// Assign a new value to the VariableListener instance value:
const intervalRef = setInterval(() => {
  myListener.value += 1;
}, 250);

setTimeout(() => {
  clearInterval(intervalRef);
}, 7000);

setTimeout(() => {
  myListener.unsubscribe(callback1);
}, 6000);

setTimeout(() => {
  myListener.unsubscribe(callback2);
}, 6000);

setTimeout(() => {
  myListener.unsubscribe(callback3);
}, 7000);
