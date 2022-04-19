# Application examples

[Dining philosophers problem](https://en.wikipedia.org/wiki/Dining_philosophers_problem)

```o
// The dining philosophers problem implementation in Join Calculus

// define channels (async molecules) for tasks communication
thinking1: reagent[`async]; hungry1: reagent[`async]; fork1: reagent[`async];
thinking2: reagent[`async]; hungry2: reagent[`async]; fork2: reagent[`async];
thinking3: reagent[`async]; hungry3: reagent[`async]; fork3: reagent[`async];
thinking4: reagent[`async]; hungry4: reagent[`async]; fork4: reagent[`async];
thinking5: reagent[`async]; hungry5: reagent[`async]; fork5: reagent[`async];

// define reactions
react[{[x:thinking1] spawn[{println "Socrates is thinking"; hungry1[x]};x]}];
react[{[x:thinking2] spawn[{println "Confucius is thinking"; hungry2[x]};x]}];
react[{[x:thinking3] spawn[{println "Plato is thinking"; hungry3[x]};x]}];
react[{[x:thinking4] spawn[{println "Descartes is thinking"; hungry4[x]};x]}];
react[{[x:thinking5] spawn[{println "Voltaire is thinking"; hungry5[x]};x]}];

react[{[x:hungry1;y:fork1;z:fork5] spawn[{println["Socrates is eating #%";cnt-x];  fork1[];fork5[]; if [x] {thinking1[x]}};x-1]}];
react[{[x:hungry2;y:fork2;z:fork1] spawn[{println["Confucius is eating #%";cnt-x]; fork2[];fork1[]; if [x] {thinking2[x]}};x-1]}];
react[{[x:hungry3;y:fork3;z:fork2] spawn[{println["Plato is eating #%";cnt-x];     fork3[];fork2[]; if [x] {thinking3[x]}};x-1]}];
react[{[x:hungry4;y:fork4;z:fork3] spawn[{println["Descartes is eating #%";cnt-x]; fork4[];fork3[]; if [x] {thinking4[x]}};x-1]}];
react[{[x:hungry5;y:fork5;z:fork4] spawn[{println["Voltaire is eating #%";cnt-x];  fork5[];fork4[]; if [x] {thinking5[x]}};x-1]}];

// spawn initial data
cnt:3; //count times
thinking1[cnt];thinking2[cnt];thinking3[cnt];thinking4[cnt];thinking5[cnt];
fork1[];fork2[];fork3[];fork4[];fork5[];

Socrates is thinking
Confucius is thinking
Plato is thinking
Descartes is thinking
Voltaire is thinking
Socrates is eating #1
Plato is eating #1
Socrates is thinking
Plato is thinking
Socrates is eating #2
Plato is eating #2
Socrates is thinking
Voltaire is eating #1
Confucius is eating #1
Plato is thinking
Descartes is eating #1
Voltaire is thinking
Socrates is eating #3
Confucius is thinking
Plato is eating #3
Descartes is thinking
Voltaire is eating #2
Confucius is eating #2
Descartes is eating #2
Voltaire is thinking
Confucius is thinking
Descartes is thinking
Voltaire is eating #3
Confucius is eating #3
Descartes is eating #3
```
