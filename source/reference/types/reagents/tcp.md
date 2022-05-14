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
[All reagents](/reference/types/reagents/overview.md)
[reagent](/verbs/concurrency/reagent.md)
[react](/verbs/concurrency/react.md)
[close](/verbs/concurrency/close.md)
[meta](/verbs/other/meta.md)
:::
