# Reagent bus

Reagent for unite other reagents to a hub such that every vаlue passed is being multiplexed for every participant.

**Syntax:** ```reagent[`bus]```

```o
o)// create empty bus
o)bus: reagent[`bus];
o)r1:  reagent[`async];
o)spawn { react {[x:r1] println["R1: %";x]}};
o)r2:  reagent[`async];
o)spawn { react {[x:r2] println["R2: %";x]}};
o)// add reagents to a bus
o)ctl[bus;(r1;r2)];
o)// send message to a bus
o)bus["Hello all!"];
R2: Hello all!
R1: Hello all!
o)// remove r1 from a bus
o)ctl[bus;(meta r1)`id];
o)// send message to a bus
o)bus["Hello all!"];
R2: Hello all!
o)
```

::: see
[All reagents](/reference/types/reagents/overview.md)
[reagent](/verbs/concurrency/reagent.md)
[react](/verbs/concurrency/react.md)
[close](/verbs/concurrency/close.md)
[meta](/verbs/other/meta.md)
:::
