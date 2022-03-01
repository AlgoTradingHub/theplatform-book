# Reagent Kdb+ listener

Allows ThePlatform behave like an KDB+ server.

**Syntax:** ```reagent[`kdb_listener]```

```o
load "kdb";
kdb_listener: reagent[`kdb_listener;"0.0.0.0:5100"];

react {[cli: kdb_listener]
    spawn[{[cli]
        // utility reagent to track stream state changes
        s: reagent[`state;cli]; react {[x:s] 0N!x};
        // receive kdb message end echos it back
        react {[x: cli] cli[@[{eval parse x};x;{`error$x}]]}
    };cli];
};
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
[kdb](/reference/types/reagents/kdb.md)
[reagent](/verbs/other/reagent.md)
[react](/verbs/other/react.md)
[close](/verbs/other/close.md)
[meta](/verbs/other/meta.md)
:::
