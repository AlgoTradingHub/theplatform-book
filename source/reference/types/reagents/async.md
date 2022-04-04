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
[sync](/reference/types/reagents/sync.md)
[bus](/reference/types/reagents/bus.md)
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
