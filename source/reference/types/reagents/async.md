# Reagent async

An asyncronuous multiple producer - single consumer queue.
Most usable type of reagent.

**Syntax:** ```reagent[`async]```

Mostly used as a transport to allow tasks communicate with each other:

```o
o)r: reagent[`async];
o)spawn { react {[x:r] println["task receives: %";x]} };
o)r[123];
task receives: 123
o)
```

Another useful case is use async reagent as a sync primitive to wait some event:

```o
o)barrier: reagent[`async];
o)spawn { barrier["TASK 1"] };
o)println["task % has been spawned";get barrier];
task TASK 1 has been spawned
o)
```

::: see
[All reagents](/reference/types/reagents/overview.md)
[reagent](/verbs/concurrency/reagent.md)
[react](/verbs/concurrency/react.md)
[close](/verbs/concurrency/close.md)
[meta](/verbs/other/meta.md)
:::
