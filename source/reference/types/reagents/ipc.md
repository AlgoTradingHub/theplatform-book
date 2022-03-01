# Reagent ipc

**Syntax:** ```reagent[`ipc;arg]```

Where arg is one of:

- string of format "host:port" to connect to
- reagent tcp to wrap to an ipc

Server example:

```o
listener: reagent[`listener;"0.0.0.0:5100"];
spawn {
    react {[x:listener]
        cli: reagent[`ipc;x];
        react {[x:cli] println["\nclient  request: [%] -- %";ts[];x]; cli[x]}
    };
};
```

Client example:

```o
cli: reagent[`ipc;"127.0.0.1:5100"];
react {[x:cli] println["server response: [%] -- %";ts[];x]};
cli["Hello from ipc client"];
```

::: see
[async](/reference/types/reagents/async.md)
[sync](/reference/types/reagents/sync.md)
[bus](/reference/types/reagents/bus.md)
[deq](/reference/types/reagents/deq.md)
[file](/reference/types/reagents/file.md)
[listener](/reference/types/reagents/listener.md)
[tcp](/reference/types/reagents/tcp.md)
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
