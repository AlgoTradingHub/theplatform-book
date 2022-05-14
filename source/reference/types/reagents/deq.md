# Reagent deq

Reagent deq is an analog of MPMC asyncronuous queue.

**Syntax:** ```reagent[`deq]```

```o
o)// create reagent deq
o)d1: reagent[`deq];
o)// spawn 3 stealers
o){spawn[{[id] d:reagent[`deq;d1]; react {[x:d] println["Task #%\nrecv: %";id;x]}};x] }'!3;
o)// send 10 items to a reagent
o){d1[x]}'!10;
Task #0
recv: 0
Task #2
recv: 2
Task #1
recv: 1
Task #0
recv: 3
Task #2
recv: 4
Task #1
recv: 5
Task #0
recv: 6
Task #2
recv: 7
Task #1
recv: 8
Task #0
recv: 9
o)
```

::: see
[All reagents](/reference/types/reagents/overview.md)
[reagent](/verbs/concurrency/reagent.md)
[react](/verbs/concurrency/react.md)
[close](/verbs/concurrency/close.md)
[meta](/verbs/other/meta.md)
:::
