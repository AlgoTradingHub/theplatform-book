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
        react {[x:cli] println["\nclient  request: %";x]; cli[(ts[];x)]}
    };
};
```

Client example:

```o
o)cli: reagent[`ipc;"127.0.0.1:5100"];
o)react {[x:cli] println["server response in % ms : %";(ts[]-x[0])%1000000;x[1]]};
o)cli["Hello from ipc client"];
client  request: Hello from ipc client
server response in 0 ms : Hello from ipc client
```

::: see
[All reagents](/reference/types/reagents/overview.md)
[reagent](/verbs/concurrency/reagent.md)
[react](/verbs/concurrency/react.md)
[close](/verbs/concurrency/close.md)
[meta](/verbs/other/meta.md)
:::
