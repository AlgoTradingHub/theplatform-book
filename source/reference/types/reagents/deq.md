# Reagent deq

Reagent deq is an analog of MPMC asyncronuous queue.

**Syntax:** ```reagent[`deq]```

```o
// create reagent deq
o)d1: reagent[`deq];
// spawn 10 stealers
o){spawn[{[id] d:reagent[`deq;d1]; react {[x:d] println["Task#% recv: %";id;x]}};x] }'!10;
// send 10 items to a reagent
o){d1[x]}'!10;
o)Task#0 recv: 0
Task#0 recv: 1
Task#0 recv: 2
Task#0 recv: 3
Task#0 recv: 4
Task#0 recv: 5
Task#0 recv: 6
Task#0 recv: 9
Task#1 recv: 8
Task#3 recv: 7
```

::: see
[async](/reference/types/reagents/async.md)
[sync](/reference/types/reagents/sync.md)
[bus](/reference/types/reagents/bus.md)
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
