# Reagent sync

Much like as async reagent, but waits ACKs on every send.
Is used for ensure that message has been delivered.

**Syntax:** ```reagent[`sync]```

::: warn
Avoid using sync reagent in the same task because it causes an deadlock.
:::

```o
o)s: reagent[`sync];
o)spawn {react {[x:s] println["value from sync reagent has been received: %";x]}};
o)s[123];
value from sync reagent has been received: 123
```

::: see
[async](/reference/types/reagents/async.md)
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
