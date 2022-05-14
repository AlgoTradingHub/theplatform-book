# Reagent listener

Binds to a network interface and accepts incoming tcp connections, producing reagents `` `tcp`` as a values.

**Syntax:** ```reagent[`listener;"host:port"]```

```o
listener: reagent[`listener;"0.0.0.0:5100"];

spawn {
    react {[x:listener]
        cli: reagent[`ipc;x];
        react {[x:cli] println["\nclient  request: [%] -- %";ts[];x]; cli[x]}
    };
};
```

::: see
[All reagents](/reference/types/reagents/overview.md)
[reagent](/verbs/concurrency/reagent.md)
[react](/verbs/concurrency/react.md)
[close](/verbs/concurrency/close.md)
[meta](/verbs/other/meta.md)
:::
