# Reagents

Reagents - core of concurrent programming in O. They behaves much like chemical reagents inside reactions. Declarative, event-based, concurrent and parallel programming is done by them. Reagents could be built-in, or exported from plugins.

- [Reagent](reference/keywords/reagent.md)
- [React](reference/keywords/react.md)

```o
o)t:reagent[`timer;1000;4;{0N!"timer destroyed: ",x}];react {[x:t] 0N!"tick"};
o)"tick"
"tick"
"tick"
"tick"
"timer destroyed: expired"
o)
```
