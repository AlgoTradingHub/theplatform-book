# Reagent Kdb+

Reagent implements KDB+ ipc protocol. Can be created directly by call ``reagent[`kdb;"host:port"]`` or returns from reagent `` `kdb_listener`` as a value.

```o
o)load "kdb";
o)kdb: reagent[`kdb;"127.0.0.1:5100"];
o)react {[x:kdb] println["kdb server reply: %";x]};
// send request to a kdb server:
o)kdb["1+2"];
kdb server reply: 3
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
[state](/reference/types/reagents/state.md)
[null](/reference/types/reagents/null.md)
[kdb listener](/reference/types/reagents/kdblistener.md)
[reagent](/verbs/other/reagent.md)
[react](/verbs/other/react.md)
[close](/verbs/other/close.md)
[meta](/verbs/other/meta.md)
:::
