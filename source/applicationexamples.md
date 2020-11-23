# Application examples

[Dining philosophers problem](https://en.wikipedia.org/wiki/Dining_philosophers_problem)

```o
// The dining philosophers problem implementation in Join Calculus

// define channels (async molecules) for tasks communication
thinking1: reagent[`async]; hungry1: reagent[`async]; fork12: reagent[`async];
thinking2: reagent[`async]; hungry2: reagent[`async]; fork23: reagent[`async];
thinking3: reagent[`async]; hungry3: reagent[`async]; fork34: reagent[`async];
thinking4: reagent[`async]; hungry4: reagent[`async]; fork45: reagent[`async];
thinking5: reagent[`async]; hungry5: reagent[`async]; fork51: reagent[`async];
// ----

// show current philosopher state (thinking or eating)
 proc: {println["% ";x]; };

// define reactions
react[{[x:thinking1] spawn[{proc["Socrates is thinking"]; hungry1[];}]}];
react[{[x:thinking2] spawn[{proc["Confucius is thinking"]; hungry2[];}]}];
react[{[x:thinking3] spawn[{proc["Plato is thinking"]; hungry3[];}]}];
react[{[x:thinking4] spawn[{proc["Descartes is thinking"]; hungry4[];}]}];
react[{[x:thinking5] spawn[{proc["Voltaire is thinking"]; hungry5[];}]}];

react[{[x:hungry1;y:fork12;z:fork51] spawn[{proc["Socrates is eating"]; thinking1[];fork12[];fork51[];}]}];
react[{[x:hungry2;y:fork23;z:fork12] spawn[{proc["Confucius is eating"]; thinking2[];fork23[];fork12[];}]}];
react[{[x:hungry3;y:fork34;z:fork23] spawn[{proc["Plato is eating"]; thinking3[];fork34[];fork23[];}]}];
react[{[x:hungry4;y:fork45;z:fork34] spawn[{proc["Descartes is eating"]; thinking4[];fork45[];fork34[];}]}];
react[{[x:hungry5;y:fork51;z:fork45] spawn[{proc["Voltaire is eating"]; thinking5[];fork51[];fork45[];}]}];

// spawn initial data
thinking1[];thinking2[];thinking3[];thinking4[];thinking5[];
fork12[];fork23[];fork34[];fork45[];fork51[];
```
