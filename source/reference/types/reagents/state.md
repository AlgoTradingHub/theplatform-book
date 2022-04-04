# Reagent state

Subscribes to any other reagent state changes and produce such events as items.

**Syntax:** ```reagent[`state;other_reagent]```

```o
o)r: reagent[`async];
o)// create reagent to receive r state notifications
o)s: reagent[`state;r];
o)react {[x:s] println["main State changed: \n%";x]};
o)close r;
main State changed:
id     | 12
message| "Custom { kind: BrokenPipe, error: \"closed\" }"
o)
```

::: see
[async](/reference/types/reagents/async.md)
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
[null](/reference/types/reagents/null.md)
[kdb listener](/reference/types/reagents/kdblistener.md)
[kdb](/reference/types/reagents/kdb.md)
[reagent](/verbs/other/reagent.md)
[react](/verbs/other/react.md)
[close](/verbs/other/close.md)
[meta](/verbs/other/meta.md)
:::
