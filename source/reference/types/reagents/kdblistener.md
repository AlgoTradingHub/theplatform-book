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
[All reagents](/reference/types/reagents/overview.md)
[reagent](/verbs/concurrency/reagent.md)
[react](/verbs/concurrency/react.md)
[close](/verbs/concurrency/close.md)
[meta](/verbs/other/meta.md)
:::
