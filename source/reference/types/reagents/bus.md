# Reagent bus

Reagent for unite other reagents to a hub such that every value passed is being multiplexed for every participant.

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
[async](/reference/types/reagents/async.md)
[sync](/reference/types/reagents/sync.md)
[deq](/reference/types/reagents/deq.md)
[file](/reference/types/reagents/file.md)
[listener](/reference/types/reagents/listener.md)
[tcp](/reference/types/reagents/tcp.md)
[ipc](/reference/types/reagents/ipc.md)
[tls](/reference/types/reagents/tls.md)
[udp](/reference/types/reagents/udp.md)
[ws](/reference/types/reagents/ws.md)
[log](/reference/types/reagents/log.md)
[timer](/reference/types/reagents/timer.md)
[tty](/reference/types/reagents/tty.md)
[state](/reference/types/reagents/state.md)
[null](/reference/types/reagents/null.md)
[kdb listener](/reference/types/reagents/kdblistener.md)
[kdb](/reference/types/reagents/kdb.md)
[reagent](/verbs/other/reagent.md)
[react](/verbs/other/react.md)
[close](/verbs/other/close.md)
[meta](/verbs/other/meta.md)
:::
