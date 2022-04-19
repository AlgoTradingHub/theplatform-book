# Reagent tcp

Justs simple tcp socket. No serialization, operates by raw bytes.

**Syntax:** ```reagent[`tcp;arg]```

Where arg is one of:

- string of format "host:port" to connect to
- reagent tcp (does nothing since it is already an tcp)

Server example:

```o
listener: reagent[`listener;"0.0.0.0:5100"];
spawn {
    react {[cli:listener]
        react {[x:cli] println["\nclient request: %";x]; cli[0x vs ts[]]}
    };
};
```

Client example:

```o
o)cli: reagent[`tcp;"127.0.0.1:5100"];
o)react {[x:cli] println["server response in % ms";(ts[]-0p sv x)%1000000]};
o)cli[0x0102030405];
client request: 0x0102030405
server response in 0 ms
```

::: see
[async](/reference/types/reagents/async.md)
[sync](/reference/types/reagents/sync.md)
[bus](/reference/types/reagents/bus.md)
[deq](/reference/types/reagents/deq.md)
[file](/reference/types/reagents/file.md)
[listener](/reference/types/reagents/listener.md)
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
