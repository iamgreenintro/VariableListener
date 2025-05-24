## VariableListener

A class for tracking and executing logic when a variable's value changes. The idea came from wanting something like RxJS's state management ([subscriptions](https://rxjs.dev/guide/subscription) & [observables](https://rxjs.dev/guide/observable#observable)) on a very basic level, but in vanilla JavaScript without any third party code.

### How does it work?

The VariableListener allows you to pass a variable upon instantiating the class. There are basically three methods you can use from here on: `subscribe(callback)` to listen and execute a callback on change, `unsubscribe(callback)` to stop tracking the variable and `subscribe(callback).updateEvery(ms)` to listen and execute a callback on change and every `n` amount of milliseconds.

### Why should I use it?

<b>You shouldn't.</b><br>
There are plenty of (state management) libraries out there that do this a lot better. Also; this is JavaScript; TypeScript would probably be the standard to write this in.

That said; this is a fun project and it's intentionally written in vanilla JavaScript without any third party code. If you're <b>only</b> looking for something that listens to a variable's value for changes, then executes some logic <b>and nothing else</b>, this suits your needs.<br>
