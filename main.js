import { VariableListener } from './modules/VariableListener.js';

let keepTrackOfThis = 'testing';

// Create a new VariableListener instance for the passed variable:
let myListener = new VariableListener(keepTrackOfThis);

console.log(myListener.value);

// Assign a new value to the VariableListener instance value:
myListener.value = 'another testing string.';
console.log(myListener.value);

const callback1 = (response) => {
  console.log('callback1: ', response);
};

const callback2 = (response) => {
  console.log('callback2: ', response);
};

const callback3 = (response) => {
  console.log('callback3: ', response);
};

myListener.subscribe(callback1).updateEvery(2000);
myListener.subscribe(callback2).updateEvery(1000);
myListener.subscribe(callback3);

myListener.value = 1;

const intervalRef = setInterval(() => {
  myListener.value += 1;
  console.log(myListener.value);
}, 150);

setTimeout(() => {
  clearInterval(intervalRef);
}, 12000);

setTimeout(() => {
  myListener.unsubscribe(callback1);
}, 5000);

setTimeout(() => {
  myListener.unsubscribe(callback2);
}, 7500);

setTimeout(() => {
  myListener.unsubscribe(callback3);
}, 2000);
