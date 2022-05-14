# Reagent timer

Reagent to produce items repeatedly by an specified interval.

**Syntax:** ```reagent[`timer;timeout;repeat]```

Where:

- timeout: an integer value in milliseconds
- repeat: an integer value indicates number of timer repetitions (0W, 0 means forever)

```o
o)t: reagent[`timer;1000;3];
o)react {[x:t] println["timer tick: %";x]};
o)
timer tick: 1000
timer tick: 1001
timer tick: 1001
```

::: see
[All reagents](/reference/types/reagents/overview.md)
[reagent](/verbs/concurrency/reagent.md)
[react](/verbs/concurrency/react.md)
[close](/verbs/concurrency/close.md)
[meta](/verbs/other/meta.md)
:::
