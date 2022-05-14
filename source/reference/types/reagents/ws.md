# Reagent ws

Reagent for making websockets.

**Syntax:** ```reagent[`ws;arg]```

Where arg is one of:

- uri: string representing url to connect to
- tcp/tls reagent to be wrapped to a websocket

```o
ws: reagent[`listener;"0.0.0.0:45101"];
react[{[x:ws]
    spawn[{[sock]
        h: reagent[`ws;sock];
        react[{[x:h] h[x]}]
    };x]
}];
```

::: see
[All reagents](/reference/types/reagents/overview.md)
[reagent](/verbs/concurrency/reagent.md)
[react](/verbs/concurrency/react.md)
[close](/verbs/concurrency/close.md)
[meta](/verbs/other/meta.md)
:::
